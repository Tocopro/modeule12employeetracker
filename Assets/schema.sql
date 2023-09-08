DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;
USE employeeTracker;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT ,
  departmentName VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT ,
  title VARCHAR(30) NOT NULL,
  salary INTEGER NOT NULL,
  departmentId INTEGER NOT NULL,
  PRIMARY KEY (id)

);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT ,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  roleId INTEGER NOT NULL,
  managerId INTEGER NOT NULL,
  PRIMARY KEY(id)
  
);