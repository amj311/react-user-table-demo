import { UsersPage, UserViewModel } from "../../../models/UserModels";

export default interface IUsersService {
    getUsersPage(page:number, perPage: number): Promise<UsersPage>;
    getUser(id:string): Promise<UserViewModel|undefined>;
}