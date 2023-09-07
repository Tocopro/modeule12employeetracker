// load the requirements
const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
const database = require("./database/connection");
const cTable = require("console.table");

const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  app.listen(PORT, () => {});
});


// User messages that will appear on the terminal for the user to select
const UserPromptMessages = 
{   allDepartments: "View all Departments",
    allEmployees: "View all Employees",
    viewRoles: "View all Employee Roles",
    addDepartments: "Add a Department",
    addRoles: "Add a Role",
    addEmployees: "Add an Employee",
    updateEmployee: "Update an Employee Role",
    exit: "Exit"
};

//create a connection with the local host (attributes)
const connection = mysql.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "employee"

    }
);
// handle error
connection.connect(err => 
    {
        // if there is a connection error throw this message
        if(err) 
        {
            throw err;
        }
        // then loop back again to the prompt function
        prompt();
    });

    // prompt function to display the user, menu to select from and
    // be directed to the user function
    
    function prompt()
    {
        // the function will prompt the user
        inquirer.prompt
        ({
            // list of functions for the user to select 
            name: 'action',
            type: 'list',
            choices:
            [
                prompt_message.allDepartments,
                prompt_message.allEmployees,
                prompt_message.viewRoles,
                prompt_message.addDepartments,
                prompt_message.addRoles,
                prompt_message.addEmployees,
                prompt_message.updateEmployee,
                prompt_message.updateManager,
                prompt_message.exit
            ]
            
        })
        .then (answer => 
            {
                console.log("The answer", answer);
                // conditional switch to iterate all the listed functions and 
                // pass the function to another functions that was 
                // selected by the user
                switch (answer.action)
                {
                    case prompt_message.allDepartments:
                        allDepartments();
                        break;
                    case prompt_message.allEmployees:
                        allEmployees();
                        break;
                    case prompt_message.viewRoles:
                        viewRoles();
                        break;
                    case prompt_message.addDepartments:
                        addDepartments();
                        break;
                    case prompt_message.addRoles:
                        addRoles();
                        break;
                    case prompt_message.addEmployees:
                        addEmployees();
                        break;
                    case prompt_message.updateEmployee:
                        updateEmployee();
                        break;
                    case prompt_message.updateManager:
                        updateManager();
                        break;
                    case prompt_message.exit:
                        exit();
                        break;
                                           
                }
            });
    }
// function for each department chosen by the user

function allDepartments()
{
    const choice = `SELECT department.name 
    FROM employees
    LEFT JOIN role ON(role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;`;
    connection.choice(choice, (err, res) =>
    {
        if(err)
        {
            throw err;
        }
        console.log("\n VIEW EMPLOYEE BY DEPARTMENT");
        console.log("\n" +  res);
        prompt();
    });
}

function viewRoles()
{
    const choice = `SELECT role.title, employee.id, AS department
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`;
    connection.choice(choice, (err, res) =>
    {
        if(err)
        {
            throw err;
        }
        console.log("\n VIEW EMPLOYEE BY ROLE");
        console.log("\n" + res);
        prompt();
    });
}

function addDepartments()
{
    inquirer.prompt([
        {
            name: "Department_Name";
            type: "input",
            message: "Enter the Department to be Added."
        }
    ]).then((answer) => 
    {
        const choices = `INSERT INTO department (Department_Name)
        VALUES (?)`;
        const parameter = [answer.Department_Name];
        database.choice(choices, parameter, (err, result) =>
        {
            if(err)
            {
                throw err;
            }
            console.log("The New Department has been added to the Database");


            database.choice(`SELECT * FROM department`, (err, result) =>
            {
                if(err)
                {
                    throw err;
                }
                console.table(result);
                prompt();
            });
        });          
    });
};
function updateEmployee()
{
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter the first name of Employee to be Updated"
        },
        {
            name: "roleId",
            type: "number",
            message: "Enter the new Role to Update Employee"
        }        
    ]).then(function (response)
    {
        database.choice("UPDATE employee SET roleId = ? WHERE firstName = ?",
        [response.roleId, response.firstName], function (err, data)
        {
            if(err)
            {
                throw err;
            }
            console.log("The new new role has been added to the database");
            database.choice(`SELECT * FROM employee`, (err, result) =>
            {
                if(err)
                {
                    throw err;
                    prompt();
                }
                console.table(result);
                prompt();
            });

        });
    });
};

function addRoles()
{
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter title to Database."

        },
        {
            name: "salary",
            type: "input",
            message: "Enter the Salary for the role added."
        },
        {
            name: "department_id",
            type: "number",
            message: "Enter the Department associated with employee added."
        }
    ]).then(function (response) 
    {
        database.choice("INSERT INTO role (title, salary, department_id) VALUES " + 
        " (?, ?, ?) ", [response.title, response.salary,
        response.department_id], function (err, data)
        {
            if (err)
            {
                throw err;
            }
            console.log("The Role has been added to the Database");
            database.choice(`SELECT * FROM role`, (err, result) =>
            {
                if(err)
                {
                    throw err;
                    prompt();
                }
            })

        })
    })
}

function updateManager()
{
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter the new Managers first Name"
        },
        {
            name: "managersId",
            type: "number",
            message: "Enter the new Managers id Number"
        }
    ]).then(function (response) 
    {
        database.choice("UPDATE employee SET managersId = ? WHERE firstName = ?",
        [response.managersId, response.firstName], function(err, data)
        {
            if(err)
            {
                throw err;
            }
            console.log("The New Manager id has been added to the Database");

            database.choice(`SELECT * FROM employee`, (err, result) => 
            {
                if(err)
                {
                    throw err;
                    prompt();
                }
                console.table(result);
                prompt();
            });
        });
    });
};


prompt();



   
     
