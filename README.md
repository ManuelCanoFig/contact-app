# contact-app

Full stack MERN (Mongo + Espress + React + NodeJs) project. 

Agenda web. This project use Express as backend server

For the routes I defined 


* Users - This route is use for register a users.
* Contacts - Handles get all contact of user, add new contact, update contact and delete contact
* Auth - It handle the authentication of users. With this route the user generate a JWToken

Also the app create a connection to a database (MongoDB) using the mongoose module.

For the FrontEnd I setted up a react application with create-react-app, the app uses the context hook to handle more efficently "global data or properties" such as an authenticated user and avoid to pass props for intermediate elements.

