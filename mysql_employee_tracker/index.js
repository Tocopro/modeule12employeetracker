// load the requirements
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

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
                prompt_message.exit
            ]
            
        })
        .then (answer => 
            {
                console.log("The answer", answer);
                // switch to iterate all the listed functions and 
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
                    case prompt_message.exit:
                        exit();
                        break;                        
                }
            });
    }
function allDepartments()
{
    
}

