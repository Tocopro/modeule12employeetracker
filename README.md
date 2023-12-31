# EMPLOYEE TRACKER
![Github license](http://img.shields.io/badge/license-MIT-blue.svg)

## MIT LICENSE
This project is licensed under MIT

## TABLE OF CONTENT
* [Description of the project](#description-of-the-project)
* [Technologies used](#technologies-used)
* [Usage](#usage)
* [Installation](#installation)
* [Link URL to GitHub Repository](#link-URL-to-GitHub-repository)

## PROJECT DESCRIPTION
This project is an employee tracker, CRUD application, using Nodejs. Questions are prompted in the CLI and the user's answers will modify the database.

## TECHNOLOGIES USED
Project is created using:
* JavaScript
* Nodejs
* Express JS
* MySQL database
* MySQL2

## SCREENSHOT

![Alt text](module12_employeeTracker.png)

## USAGE

![Alt text](<Module 12 Employee Tracker.gif>)




## INSTALLATION
Here are some guidelines for installing the project on your local machine in order to be able to try it: 

1. Make sure to have MySQL server downloaded and running.

2. Since Node.js applications don't have a front end, clone or download the repository to your own local machine and run it from your command line.

3. Then, make sure that your repo includes a package.JSON with the required dependencies. You can create one by running ```npm init``` in your command line.

4. Run ```npm i``` or ```npm install``` in order to download all the dependencies.

5. Here are the MySQL instructions to create your tables:

- Enter ```mysql -u root -p``` in the CLI to enter MySQL.
 
- Create your database by entering ```CREATE DATABASE employees;``` and enter.
- Make sure it was created successfully by entering ```SHOW databases;```.
- Tell your database to use the employees database by entering ```USE employees;```.
- Exit MySQL by entering ```quit;```.
- Your are done!

6. Run ```node index.js```  in your terminal to launch the application.



## GITHUB REPOSITORY URL

https://github.com/Tocopro/modeule12employeetracker
