import { UsersPage, UserViewModel } from "../../../models/UserModels";
import IUsersService from "./IUsersService";

const API_URL = "http://localhost:3001";

export default class DemoUserService implements IUsersService {
    constructor() {}

    async getUsersPage(page: number, perPage: number): Promise<UsersPage> {
        return await fetch(API_URL+`/users/page/${page}/perPage/${perPage}`)
            .then(data=>data.json());
        // return {page: 1, pageUsers: [], totalUsers: 1} as any;
    }

    async getUser(id:string): Promise<UserViewModel> {
        return await fetch(API_URL+`/users/${id}`)
            .then(data=>data.json());
    }


}