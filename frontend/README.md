# User Administration

## Setup
For install _User Administration_ run in terminal the command `npm install`.

## Run
For run _User Administration_ first run the dockers containers for server and db with `docker-compose up` (see [the README.md of the root folder](https://github.com/sermmor/user-administration), for more information). Then run in terminal the command `npm start`. The application will run in `http://localhost:8001`.

## Use the App.
First open your browser and go to [http://localhost:8001](http://localhost:8001), and then you have to log into the application pushing the _Sign in with Google_ button.

![Capture1](https://github.com/sermmor/stoeer-test-angular/raw/master/frontend/readmeImages/01.png)

Once we're log in the application, we will see a screen like that:

![Capture2](https://github.com/sermmor/stoeer-test-angular/raw/master/frontend/readmeImages/02.png)

If we want to add a new user, we have to push in the _Add new user_ button, and we will be redirect to a new form screen:

![Capture3](https://github.com/sermmor/stoeer-test-angular/raw/master/frontend/readmeImages/03.png)

When we have completed the form, push in _Add user_ (if we don't want to add a new user, click in _Return to user list_ ), and we will be redirect to the user list (all the IBAN examples are from a [random IBAN generator](https://www.mobilefish.com/services/random_iban_generator/random_iban_generator.php)):

![Capture4](https://github.com/sermmor/stoeer-test-angular/raw/master/frontend/readmeImages/04.png)

So we can add several users to see more users in the user list:

![Capture5](https://github.com/sermmor/stoeer-test-angular/raw/master/frontend/readmeImages/05.png)

If you add an user log in with other Google account, you won't edit or deleted the added user in another account (manipulation operations are restricted on a user to the administrator who created them). For instance, in our example Christina Crawford has been added using other different Google account:

![Capture6](https://github.com/sermmor/stoeer-test-angular/raw/master/frontend/readmeImages/06.png)

If you push _Edit_ you will be redirected to the _Edit User_ screen.

![Capture7](https://github.com/sermmor/stoeer-test-angular/raw/master/frontend/readmeImages/07.png)

We can modified anything and push _Edit_ to go back to the user list (in our example, the new name of Sophie Simpson is Rosemary Simpson).

![Capture8](https://github.com/sermmor/stoeer-test-angular/raw/master/frontend/readmeImages/08.png)

If you push _Delete_ in a user, the user will be delete from the user list (in our example, Manuel Watts has been deleted from the system).

![Capture9](https://github.com/sermmor/stoeer-test-angular/raw/master/frontend/readmeImages/09.png)

If we push _sign out_ button (in the top bar) we'll return to the first screen.

![Capture10](https://github.com/sermmor/stoeer-test-angular/raw/master/frontend/readmeImages/01.png)
