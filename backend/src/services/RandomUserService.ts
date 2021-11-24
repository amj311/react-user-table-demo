import axios from "axios";
import { UserListModel, UsersPage, UserViewModel } from "../../../models/UserModels";
import IUsersService from "./IUsersService";

const TARGET_USER_TOTAL = 7000;
const SEED = "clozd_rocks";
const FIELDS = "login,name,picture,email,location,phone,dob"

export default class RandomUserService implements IUsersService {
    private data: Map<string,UserViewModel> = new Map();

    constructor() {
        this.loadData().catch((err:Error)=>{
            console.log("Could not load users into data!")
            console.log(err.message)
        });
    }

    private async fetchUsersIntoData(page:number, numUsers: number) {
        let res = await axios.get(`https://randomuser.me/api/?page=${page}&results=${numUsers}&seed=${SEED}&inc=${FIELDS}&nat=us,gb`);
        res.data.results.forEach((u:any)=>{
            let {street,city,state,country,postcode} = u.location;
            let address = {street,city,state,country,postcode};
            this.data.set(u.login.uuid, new UserViewModel(
                u.login.uuid,
                u.name.first+" "+u.name.last,
                u.picture.large,
                u.email,
                u.phone,
                u.dob.date,
                address,
            ))
        });
    }

    private async loadData() {
        this.data.clear();
        console.log("Loading user data...");

        // The randomuser.me server does not allow retrieving 7000 users at a time.
        const BATCH_SIZE = TARGET_USER_TOTAL / 2;
        await this.fetchUsersIntoData(1, BATCH_SIZE);
        await this.fetchUsersIntoData(2, BATCH_SIZE);

        console.log("User data loaded: ",this.data.size);
    }

    async getUsersPage(page: number, perPage: number): Promise<UsersPage> {        
        let totalUsers = this.data.size;
        let pageStart = ((page-1)*perPage)+1;
        let pageEnd = page*perPage;
        
        let pageUsers: UserListModel[] = [];
        let hasMoreUsers: boolean = false;

        if (pageEnd < totalUsers) {
            hasMoreUsers = true;
        }
        else if (pageEnd > totalUsers){
            pageEnd = totalUsers - pageStart;
        }
        
        if (pageStart <= totalUsers) {
            pageUsers = Array.from(this.data.values()).slice(pageStart-1,pageEnd).map(u=>{
                return new UserListModel(
                    u.id,
                    u.name,
                    u.email,
                    u.address
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