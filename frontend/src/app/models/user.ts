import { usersMock } from '../mocks/users-mock';

export class User {
    constructor(
        public name: string,
        public street: string,
        public phone: string,
        public iban: string
    ) {}

    getUsers(): Promise<User[]> {
        return this.getUsersFromJson();
    }

    private getUsersFromJson(): Promise<User[]> {
        const usersAsinc = new Promise<User[]>((resolve, reject) => {
            const users = usersMock;
            resolve(users);
        });
        return usersAsinc;
    }
}