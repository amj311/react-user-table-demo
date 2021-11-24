import axios from "axios";
import { UserListModel, UsersPage, UserViewModel } from "../../../models/UserModels";
import IUsersService from "./IUsersService";

const TARGET_USER_TOTAL = 7000;
const SEED = "clozd_rocks";
const FIELDS = "login,name,picture,email,location,phone,dob"

/**
 * An implementation of IUserService that gathers its data from randomuser.me.
 * This service should be instantiated only once as it maintains a store of
 * data. 
 * 
 * This implementation loads 7000 users into memory in order to deliver consistent
 * and rapid responses. This approach saves us from making a request to
 * randomuser.me whenever a page is requested, which is slow for our users and
 * unkind to their service.
 */
export default class RandomUserService implements IUsersService {
    private data: Map<string,UserViewModel> = new Map();
    private userIds: string[] = [];

    constructor() {
        this.loadData().catch((err:Error)=>{
            console.log("Could not load users into data!")
            console.log(err.message)
        });
    }

    private async loadData() {
        this.data.clear();
        console.log("Loading user data...");

        // The randomuser.me server does not allow retrieving 7000 users at a time,
        // so we request them in batches.
        const BATCH_SIZE = TARGET_USER_TOTAL / 2;
        await this.fetchUsersIntoData(1, BATCH_SIZE);
        await this.fetchUsersIntoData(2, BATCH_SIZE);

        console.log("User data loaded: ",this.data.size);
    }


    private async fetchUsersIntoData(page:number, numUsers: number) {
        let res = await axios.get(`https://randomuser.me/api/?page=${page}&results=${numUsers}&seed=${SEED}&inc=${FIELDS}&nat=us,gb`);
        res.data.results.forEach((u:any)=>{
            let {street,city,state,country,postcode} = u.location;
            let address = {street,city,state,country,postcode};
            
            // Save user into map for constant-time read.
            this.data.set(u.login.uuid, new UserViewModel(
                u.login.uuid,
                u.name.first+" "+u.name.last,
                u.picture.large,
                u.email,
                u.phone,
                u.dob.date,
                address,
            ))
            
            // Save array of keys for slightly quicker pagination.
            // This array must always be in sync with data!!!
            this.userIds.push(u.login.uuid);
        });
    }


    async getUsersPage(page: number, perPage: number): Promise<UsersPage> {        
        // Define totalUsers as the actual size of this.data in case data
        // did not load fully or for any reason does not match TARGET_USER_TOTAL
        let totalUsers = this.data.size;
        let pageStart = ((page-1)*perPage)+1;
        let pageEnd = page*perPage;
        
        let pageUsers: UserListModel[] = [];
        let hasMoreUsers: boolean = false;

        // Indicate whether or not this should be the final page of users
        if (pageEnd < totalUsers) {
            hasMoreUsers = true;
        }
        // If the final page has fewer results than perPage, modify pageEnd
        else if (pageEnd > totalUsers){
            pageEnd = totalUsers;
        }
        
        // Only bother getting the data if the are any results on the page.
        if (pageStart <= totalUsers) {
            pageUsers = this.userIds.slice(pageStart-1,pageEnd).map(id=>{
                // Because must be in sync with this.data, we can ignore
                // the case that this.data.get(id) is undefuned
                let user: any = this.data.get(id);
                return new UserListModel(
                    user.id,
                    user.name,
                    user.email,
                    user.address
                )
            })
        }

        return {
            page,
            perPage,
            pageUsers,
            totalUsers,
            hasMoreUsers
        }
    }


    async getUser(id:string): Promise<UserViewModel|undefined> {
        return this.data.get(id);
    }


}