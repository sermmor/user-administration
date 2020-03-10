import { usersMock } from '../mocks/users-mock';

export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    iban: string;
    own?: boolean;
}

const apiUsersUrl = 'http://testcase.rh-dev.eu:8000/api/users';

export class UserManager {
    private static headerAuthorizationRequest = {
        'Authorization': 'Token '
    }

    static setAuthorizationToken(idToken: string) {
        UserManager.headerAuthorizationRequest = {
            'Authorization': 'Token ' + idToken
        };
    }

    static createUser(
        firstName: string,
        lastName: string,
        iban: string,
    ): Promise<User> {
        const user = { first_name: firstName, last_name: lastName, iban };

        const initAddedNewUser = {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            ...UserManager.headerAuthorizationRequest,
            'Content-Type': 'application/json'
          }
        };

        return new Promise<User>((resolve, reject) => {
            fetch(apiUsersUrl, initAddedNewUser)
                .then(response => response.json())
                .then(response => resolve(UserManager.fromJsonToUser(response)));
        });
    }

    static updateUserById(
        id: string,
        firstName: string,
        lastName: string,
        iban: string,
    ): Promise<User> {
        const indexUserToUpdate = UserManager.searchUserIndexById(id);
        const user = usersMock[indexUserToUpdate];
        
        user.firstName = firstName;
        user.lastName = lastName;
        user.iban = iban;

        return new Promise<User>((resolve, reject) => {
            resolve(user);
        });
    }

    static deleteUserById(id: string): Promise<void> {
        const indexUserToDelete = UserManager.searchUserIndexById(id);

        return new Promise<void>((resolve, reject) => {
            usersMock.splice(indexUserToDelete, 1);
            resolve();
        });
    }

    static getUsers(): Promise<User[]> {
        return UserManager.getUsersFromJson(UserManager.headerAuthorizationRequest);
    }

    static getUserById(id: string): Promise<User> {
        const indexUser = UserManager.searchUserIndexById(id);

        return new Promise<User>((resolve, reject) => {
            const user: User = usersMock[indexUser];
            resolve(user);
        });
    }

    private static searchUserIndexById(id: string): number {
        return usersMock.findIndex((user: User) => user.id === id);
    }

    private static getUsersFromJson(headerRequest: HeadersInit): Promise<User[]> {
        const initGetUser = {
          method: 'GET',
          headers: headerRequest,
        };

        return new Promise<User[]>((resolve, reject) => {
            fetch(apiUsersUrl, initGetUser)
              .then(response => {
                response.json().then(json => {
                    const users = UserManager.fromJsonToUserList(json);
                    resolve(users);
                });
              }
            );
        });
    }

    private static fromJsonToUserList(json: any): User[] {
        return json.map(jsonUser => UserManager.fromJsonToUser(jsonUser));
    }

    private static fromJsonToUser(jsonUser: any): User {
        return {
            id: jsonUser.id,
            firstName: jsonUser.first_name,
            lastName: jsonUser.last_name,
            iban: jsonUser.iban,
            own: jsonUser.own
        };
    }
}
