export enum userRole {
    Guest = 'guest',
    Member = 'member'
}


export interface User{
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    role: userRole
}