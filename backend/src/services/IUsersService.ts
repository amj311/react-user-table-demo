import { UsersPage, UserViewModel } from "../../../models/UserModels";

/**
 * Interface used for fetching User Data
 */
export default interface IUsersService {

    /**
     * Fetches a shallow copy of the Users on a particular page of results.
     * The `perPage` value determines which results are found on which page,
     * so it should be the same for sequential page requests.
     * 
     * @param page Number indicating which page of results to return
     * @param perPage Number indicating how many results should be on each page
     */
    getUsersPage(page:number, perPage: number): Promise<UsersPage>;

    /**
     * Fetches the entire User entry for the ID provided.
     * @param id User Id
     */
    getUser(id:string): Promise<UserViewModel|undefined>;
}