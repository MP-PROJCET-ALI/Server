# Server


➤ Server side: https://github.com/MP-PROJCET-ALI/Server

➤ Deployment: https://Deployment

➤ While running locally: http://localhost:5000

➤ Trello: https://trello.com/b/ObBLMFK9/final-project-planning

➤ Slides: https://Slides



## story

 **Location Page**
 I entered the site with two options and on the left a motion picture. The right side contains a new account or login.
 
 **home page**
 The Hum page has Nav Bar and in the middle of the page on the left are news related to hospital and human health.
Nav Bar has the wax in the middle, the right side the medical file option, and the left side the choice of who we are and who we are.

**Access to medical file**
A doctor can spend medication and write reports with your medical file, and he can modify your file. With the possibility of modification from another doctor
 **Show Names From Not on File**
 If your medical file is modified, the name of the change will appear with the time and time that the change was made.
 
 **logged out**
 Login out at the end of your tour inside the site, and after you've been briefed on the entire medical record, you can log out to keep your information private.
 
 
 ## User Stories
 
 - **The user must have an account and be logged in if he wants to use the website features**
 - **The logged-in user can book an appointment and see the medical file**
 - **The user can log in on the website, book an appointment, request a private buyer and other medical services.**
 - **A registered user can browse the web site without having to modify only for reading and viewing**
 - **The user who logged in has their own file plate containing all their information and statistics.**
 - **The  `admines` the login with the role has all the features of the regular user. Possible modification of patient information**
 - **The user who logged in with the role can delete or modify with the time of modification and the `admin` name.**
 - **The user has a login and has the role of a control board that contains all the information and statistics of the web site that enable them to control all    patients.**
 
 ## ER Diagram
 
 ![Blank diagram backEnd project](https://user-images.githubusercontent.com/92247967/146677427-60e1ad46-9b5a-4c0d-93ea-f92ce133243a.png)
 
 ### ■ Backend routes
 
| HTTP Method | URL            | Request Body                                                  | Success status | Error Status  | Permissions                |  Description                                                  |
| ----------- | -------------- | ---------------------------------------------------------- | -------------- | ------------ | --------------------------------|---------------------------- |
| GET         | `/login/:id`     | n/a                                                          | 200            | 404          |   public `<Route>`                |Check if user is logged in and return profile page           |
| POST        | `/signup` | {username, email, password }                                    | 201            | 404          |  public `<Route>`               | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/login`  | {email, password}                                         | 200            | 401          |  public `<Route>`               | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/logout` | n/a                                                      | 204            | 400          |  user only `<PrivateRoute>`               | Logs out the user                                            |
| GET         | `/getuser`        | n/a | 200               | 404   |  public `<Route>`          |Used to get medicl . |Show the user file
| PUT         | `/updatemedicl`  | {Health status, Treatments, diseases,  Conversion |  201           | 400      |  Admin only `<PrivateRoute>`    | Admin to update one          
| get         | `/readmedicl`  | {Health status, Treatments, diseases,  Conversion |  201           | 400      |  Admin only `<PrivateRoute>`    | Admin to get one    | delete         | `/deletemedicl`  | {Health status, Treatments, diseases,  Conversion |  201           | 400      |  Admin only `<PrivateRoute>`    | Admin to delete one 
| Post         | `/medicl`  | {Health status, Treatments, diseases,  Conversion |  201           | 400      |  Admin only `<PrivateRoute>`    | Admin to post one 
| Post         | `/ceratrole`  | {Role, Permossin |  201           | 400      |  Admin only `<PrivateRoute>`    | Admin to post one 

 
  ## UML Diagram
  
  
![uml backend](https://user-images.githubusercontent.com/92247967/146677451-e97a8a2f-4f45-49e1-8c8a-cbd5402728b4.png)

### ■ Installing Dependencies

#### ▸ Node js

Follow instructions to install the latest version of Node js for your platform in the [Node js docs](https://nodejs.org/en/).

#### ▸ NPM Dependencies

Once you have the project in your local machine, install dependencies by running:

```bash
npm install
```

This will install all of the required packages.

#### ▸ Key Dependencies

- [Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- [mongoose](https://mongoosejs.com/) is an elegant mongodb object modeling for node.js.

- [morgan](https://www.npmjs.com/package/morgan) is a HTTP request logger middleware for node.js.

- [bcrypt](https://www.npmjs.com/package/bcrypt) is a A library to help you hash passwords.

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) is a JSON Web Token implementation (symmetric and asymmetric).

#### ▸ Setting up the variables

You have to set up some variables in the `.env` file, for the app to run properly.

```
PORT=5000
DB_URL=`Your MongoDB DB URL`
SALT=`Your SALT here`
SECRET_KEY=`Your SECRET KEY here`
```

## ⚪ Running the server

To run the server, execute:

```bash
npm run dev
```

For running the server in development mode, and execute:

```bash
npm run start
```

To run the server on production mode.
 
 ## ⚪ Models

### ▼ Users

| key          | type                | options          | default value    |
| ------------ | ------------------- | ---------------- | ---------------- |
| email        | String              | required, unique | N/A              |
| name         | String              | required         | N/A              |
| password     | String              | N/A              | N/A              |
| phone       | number              | N/A              | N/A |
| Role       | Schema <Roles>             | N/A              | N/A              |
| passwordCode | String              | N/A              | ''               |
| timestamp    | Date                | N/A              | Date now         |
 
 
  ### ▼ Medical file

| key          | type                | options          | default value    |
| ------------ | ------------------- | ---------------- | ---------------- |
| The patient's condition        | String              | required,  | N/A              |
| username         | Schema <User>              | required         | N/A              |
| password     | String              | N/A              | N/A              |
| phone       | number              | N/A              | N/A |


 
 
 ### ▼ Roles

| key         | type   | options  | default value |
| ----------- | ------ | -------- | ------------- |
| role        | String | required | N/A           |
| permissions | Array  | required | N/A           |
| timestamp   | Date   | N/A      | Date now      |

 
 ### ▼ Doctor

| key          | type                | options          | default value    |
| ------------ | ------------------- | ---------------- | ---------------- |
| username        | String              | required, unique | N/A              |
| Role         | Schema <Roles>               | N/A         | N/A              |
| Hospital     | String              | N/A              | N/A              |


 ### ▼ Hospital

| key          | type                | options          | default value    |
| ------------ | ------------------- | ---------------- | ---------------- |
| name        | String              | required, unique | N/A              |
| Rejon         | String              | required         | N/A              |
| the ID number     | String              | N/A              | N/A              |
 | license number     | String              | N/A              | N/A              |

 
 
