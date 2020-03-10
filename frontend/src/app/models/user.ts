import { usersMock } from '../mocks/users-mock';

export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    iban: string;
}

export class UserManager {
    static createUser(
        firstName: string,
        lastName: string,
        iban: string,
    ): Promise<User> {
        const user = { firstName, lastName, iban };

        return new Promise<User>((resolve, reject) => {
            usersMock.push(user);
            resolve(user);
        });
    }

    static updateUserById(
        id: string,
        firstName: string,
        lastName: string,
        iban: string,
    ): Promise<User> {
        const indexUserToUpdate = this.searchUserIndexById(id);
        const user = usersMock[indexUserToUpdate];
        
        user.firstName = firstName;
        user.lastName = lastName;
        user.iban = iban;

        return new Promise<User>((resolve, reject) => {
            resolve(user);
        });
    }

    static deleteUserById(id: string): Promise<void> {
        const indexUserToDelete = this.searchUserIndexById(id);

        return new Promise<void>((resolve, reject) => {
            usersMock.splice(indexUserToDelete, 1);
            resolve();
        });
    }

    static getUsers(): Promise<User[]> {
        return this.getUsersFromJson();
    }

    static getUserById(id: string): Promise<User> {
        const indexUser = this.searchUserIndexById(id);

        return new Promise<User>((resolve, reject) => {
            const user: User = usersMock[indexUser];
            resolve(user);
        });
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