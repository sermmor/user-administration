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
        const user = { first_name: firstName, last_name: lastName, iban };

        const initUpdateUser = {
          method: 'PUT',
          body: JSON.stringify(user),
          headers: {
            ...UserManager.headerAuthorizationRequest,
            'Content-Type': 'application/json'
          }
        };

        return new Promise<User>((resolve, reject) => {
            fetch(apiUsersUrl + '/' + id, initUpdateUser)
                .then(response => response.json())
                .then(response => resolve(UserManager.fromJsonToUser(response)));
        });
    }

    static deleteUserById(id: string): Promise<void> {
        const initDeleteUser = {
            method: 'DELETE',
            headers: {
              ...UserManager.headerAuthorizationRequest,
              'Content-Type': 'application/json'
            }
          };

        return new Promise<void>((resolve, reject) => {
            fetch(apiUsersUrl + '/' + id, initDeleteUser)
                .then(response => resolve());
        });
    }

    static getUsers(): Promise<User[]> {
        return UserManager.getUsersFromJson(UserManager.headerAuthorizationRequest);
    }

    static getUserById(id: string): Promise<User> {
        const initGetUser = {
            method: 'GET',
            headers: UserManager.headerAuthorizationRequest,
        };

        return new Promise<User>((resolve, reject) => {
            fetch(apiUsersUrl + '/' + id, initGetUser)
                .then(response => {
                    response.json().then(json => {
                        const user = UserManager.fromJsonToUser(json);
                        resolve(user);
                    });
                })
        });
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
