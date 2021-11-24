export class UserViewModel {
    constructor(
        public id: string,
        public name: string,
        public photo: string,
        public email: string,
        public phone: string,
        public dob: string,
        public address:{
            street: {
                number: number,
                name: string
            },
            city: string,
            state: string,
            country: string,
            postcode: string
        }
    ){}
}


export class UserListModel {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public address:{
            street: {
                number: number,
                name: string
            },
            city: string,
            state: string,
            country: string,
            postcode: string
        }
    ){}
}


export type UsersPage = {
    page: number,
    perPage: number,
    pageUsers: UserListModel[],
    hasMoreUsers: boolean,
    totalUsers: number
}