export class UserViewModel {
    constructor(
        public id: string,
        public name: string,
        public photo: string,
        public email: string,
        public phone: string,
        public dob: string,
        public street: {
            number: number,
            name: string
        },
        public city: string,
        public country: string,
        public postcode: string
    ){}
}


export class UserListModel {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public city: string,
        public country: string,
    ){}
}


export type UsersPage = {
    page: number,
    perPage: number,
    pageUsers: UserListModel[],
    hasMoreUsers: boolean,
    totalUsers: number
}