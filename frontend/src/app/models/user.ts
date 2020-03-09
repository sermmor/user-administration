import { usersMock } from '../mocks/users-mock';

export interface User {
    id: string;
    name: string;
    street: string;
    phone: string;
    iban: string;
    isAdmin: boolean;
}

export class UserManager {
    static createUser(
        id: string,
        name: string,
        street: string,
        phone: string,
        iban: string,
        isAdmin = false
    ): Promise<User> {
        const user = { id, name, street, phone, iban, isAdmin };

        return new Promise<User>((resolve, reject) => {
            usersMock.push(user);
            resolve(user);
        });
    }

    static updateUserById(
        id: string,
        name: string,
        street: string,
        phone: string,
        iban: string,
        isAdmin: boolean
    ): Promise<User> {
        const indexUserToUpdate = this.searchUserIndexById(id);
        const user = usersMock[indexUserToUpdate];
        
        user.name = name;
        user.street = street;
        user.phone = phone;
        user.iban = iban;
        user.isAdmin = isAdmin;

        return new Promise<User>((resolve, reject) => {
            resolve(user);
        });
    }

    static deleteUserById(id: string) {
        const indexUserToDelete = this.searchUserIndexById(id);
        usersMock.splice(indexUserToDelete);
    }

    static getUsers(): Promise<User[]> {
        return this.getUsersFromJson();
    }

    private static searchUserIndexById(id: string): number {
        return usersMock.findIndex((user: User) => user.id === id);
    }

    private static getUsersFromJson(): Promise<User[]> {
        const usersAsinc = new Promise<User[]>((resolve, reject) => {
            const users = usersMock;
            resolve(users);
        });
        return usersAsinc;
    }
}