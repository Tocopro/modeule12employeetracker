// load the requirements
const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require('express');



// Connect to database
const database = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username and port,
      port: 3306,
      user: 'root',
      // Your MySQL password
      password: '',
      database: 'employeeTracker'
    },
    console.log('Connected to the employee database.')
    

);


const PORT = process.env.PORT || 3306;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Starting server after Database connection
database.connect(function(err) 
{
    if (err)
    {
        throw err;
    }
    console.log("Connected");
    prompted();
});





    // prompt function to display the user, menu to select from and
    // be directed to the user function
    
    function prompted()
    {
        // the function will prompt the user
        inquirer.prompt
        ({
            // list of functions for the user to select 
            name: 'menu',
            type: 'list',
            choices:[
                "view all Departments",
                "view all Employees",
                "view all Roles",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update Employee Role",
                "Quit"               
            ]         
            })
            .then(function(result)
            {
                console.log("Your Choice: " + result.menu);
           
            
        
                // conditional switch to iterate all the listed functions and 
                // pass the function to another functions that was 
                // selected by the user
                switch (result.menu)
                {
                    case "view all Departments":
                        allDepartments();
                        break;
                    case "view all Employees":
                        allEmployees();
                        break;
                    case "view all Roles":
                        viewRoles();
                        break;
                    case "Add a Department":
                        addDepartment();
                        break;
                    case "Add a Role":
                        addRole();
                        break;
                    case "Add an Employee":
                        addEmployee();
                        break;
                    case "Update Employee Role":
                        updateEmployee();
                        break;  
                    default:
                        quit();                
                    
                }
            });
        
    };
    
   
// function for viewing all departments chosen by user in the menu

function allDepartments()
{
    const choice = `SELECT * FROM department`; 
    database.query(choice, (err, result) => 
    {
        if(err)
        {
            res.status(500).json({error: err.message});
            return;
        }
        console.table(result);
        prompted();
    });  
}

// function for viewing all Roles chosen by the user in the menu

function viewRoles()
{
    const choice = `SELECT * FROM role`;
    database.query(choice, (err, result) =>
    {
        if (err)
        {
            res.status(500).json({ error: err.message});
            return;
        }
        console.table(result);
        prompted();
    });  
}


// function to view all employees chosen by the user in the menu

function allEmployees()
{
    const choice = `SELECT  * FROM employee`;
   
    database.query(choice, (err, result) => 
    {
        if(err)
        {
            throw err;
        }
        console.table(result);
        prompted();
    });
};


// function for adding departments as chosen by the user in the menu
function addDepartment()
{
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "Enter the Department to be Added."
        }
    ]).then((answer) => 
    {
        const choice = `INSERT INTO department (departmentName)
        VALUES (?)`;
        const parameter = [answer.departmentName];
        database.query(choice, parameter, (err, result) =>
        {
            if(err)
            {
                throw err;
            }
            console.log("The New Department has been added to the Database");


            database.query(`SELECT * FROM department`, (err, result) =>
            {
                if(err)
                {
                    res.status(500).json({error: err.message});
                    return;
                }
                console.table(result);
                prompted();
            });
        });          
    });
};
// function to add an Employee to the database as chosen by the user in the menu
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
            message: "Enter the new role number of the employee to Update Database"
        }        
    ]).then(function (response)
    {
        database.query("UPDATE employee SET roleId = ? WHERE firstName = ?",
        [response.roleId, response.firstName], function (err, data)
        {
            if(err)
            {
                throw err;
            }
            console.log("The new new role has been added to the database");
            database.query(`SELECT * FROM employee`, (err, result) =>
            {
                if(err)
                {
                    res.status(500).json({error: err.message})
                    prompted();
                }
                console.table(result);
                prompted();
            });
        });
    });
};

// function to add roles in the database as chosen by the user in the menu
function addRole()
{
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter title to add in Database."

        },
        {
            name: "salary",
            type: "input",
            message: "Enter the Salary for the role added in database."
        },
        {
            name: "departmentId",
            type: "number",
            message: "Enter the Department associated with employee adding to the database."
        }
    ]).then(function (response) 
    {
        database.query("INSERT INTO role (title, salary, departmentId) VALUES  (?, ?, ?) ", [response.title, response.salary, response.departmentId], function (err, data)
        {
            if (err)
            {
                throw err;
            }
            console.log("The Role has been added to the Database");
            database.query(`SELECT * FROM role`, (err, result) =>
            {
                if(err)
                {
                    res.status(500).json({error: err.message})
                    prompted();
                }
                console.table(result);
                prompted();
            });
        });
    });
};

// function to add an employee to the database as chosen by the user in the menu

function addEmployee()
{
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter first name of Employee"
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter last name of employee"
        },
        {
            name: "roleId",
            type: "number",
            message: "Enter the Role Id Number"
        },
        {
            name: "managerId",
            type: "number",
            message: "Enter the managers Id number"
        }
    ]).then (function (response)
    {
        database.query("INSERT INTO employee (firstName, lastName, roleId, managerId)  VALUES (?, ?, ?, ?)", 
        [response.firstName,response.lastName, response.roleId, response.managerId],
        function (err, data)
        {
            if(err)
            {
                throw err;
            }
            console.log("New employee has been added");
            database.query(`SELECT * FROM employee`, (err, result) =>
            {
                if (err)
                {
                    res.status(500).json({error: err.message});
                    prompted();
                }
                console.table(result);
                prompted();
            });
        });
    });
};

function quit()
{
    database.end();
    process.exit();
}

   
     
