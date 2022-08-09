const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
    if (err) throw err;
    console.log('Database connected successfully');
    employeeTrack();
})


//Using inquierer to prompt questions

function employeeTrack () {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'What would you like to select?',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update an Employees role', 'Quit']
    }])
    .then((response) => {
        if (response.prompt === 'View Departments') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log('You are now viewing all the available departments');
                console.table(result);
                employeeTrack();
            });
        } else if (response.prompt === 'View Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log('You are now viewing all roles');
                console.table(result);
                employeeTrack();
            });
        } else if (response.prompt === 'View Emplyees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log('You are now viewing all employees');
                console.table(result);
                employeeTrack();
            });
        } else if (response.prompt === 'Add Department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What would you like to name this department',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please enter the name for the department');
                        return false;
                    }
                }
            }])
            .then((response) => {
                db.query(`INSERT INTO department (name) VALUES(?)`, [response.department], (err, result) => {
                    if (err) throw err;
                    console.log(`The ${response.department} department was added to the db`)
                    employeeTrack();
                });
            })
        }  else if (response.prompt === 'Add Role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                inquirer.prompt ([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Please enter the name for this role',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please enter a role');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Please enter the salary for this type of role',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Please enter a value for the salary');
                                return false;
                            }
                        }
                    }, 
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which Department does this role belong to?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }

                            return array;
                        }
                    }
                ])
                .then((response) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === response.department) {
                            var department = result[i];
                        }
                    }

                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [response.role, response.salary, department.id], (err, result) =>{
                        console.log(`The ${response.role} role was added to the database`)
                        employeeTrack();
                    });
                })
            });
        } else if (response.prompt === 'Add Employee') {
            db.query(`SELECT * FROM employee, role`, (err,result) => {
                if(err) throw err;

                inquirer.prompt ([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Please enter the employee first name',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please enter a name');
                                return false;
                            }
                        }
                    }, 
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Please enter the employee last name',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please enter a valid last name');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Please select the employees role',
                        choices: () => {
                            var array = [];
                            for (var i=0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var updatedArray = [...new Set(array)];
                            return updatedArray;
                        }
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: 'Please enter the manager for the employee',
                        validate: managerInput => {
                            if (managerInput) {
                                return true;
                            } else {
                                console.log('Please enter a manager for the employee');
                                return false;
                            }
                        }
                    }
                ])
            })
        }
    })
}