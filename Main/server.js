const { Pool } = require('pg');
const inquirer = require('inquirer');

const pool = new Pool({
    user: 'postgres',
    password: 'SQL',
    host: 'localhost',
    database: 'company_a_db',
});

const mainMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit',
                ],
            },
        ])
        .then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    pool.end();
                    process.exit();
            }
        });
};

const viewAllDepartments = async () => {
    try {
        const result = await pool.query('SELECT * FROM departments');
        console.table(result.rows);
        mainMenu();
    } catch (err) {
        console.error('Error fetching departments:', err);
        mainMenu();
    }
};

const viewAllRoles = async () => {
    try {
        const result = await pool.query(`
            SELECT roles.id, roles.title
            FROM roles
            JOIN departments ON roles.department_id = departments.id
        `);
        console.table(result.rows);
        mainMenu();
    } catch (err) {
        console.error('Error fetching roles:', err);
        mainMenu();
    }
};

const viewAllEmployees = async () => {
    try {
        const result = await pool.query(`
            SELECT employees.id, employees.first_name, employees.last_name
            FROM employees
            JOIN roles ON employees.role_id = roles.id
            JOIN departments ON roles.department_id = departments.id
        `);
        console.table(result.rows);
        mainMenu();
    } catch (err) {
        console.error('Error fetching employees:', err);
        mainMenu();
    }
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department_name',
                message: 'Enter the name of the new department:',
            },
        ])
        .then(async (answer) => {
            try {
                const result = await pool.query(
                    'INSERT INTO departments (department_name) VALUES ($1) RETURNING *',
                    [answer.department_name]
                );
                console.log(
                    `Added department: ${result.rows[0].department_name}`
                );
                mainMenu();
            } catch (err) {
                console.error('Error adding department:', err);
                mainMenu();
            }
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the name of the new role:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the new role:',
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID for the new role:',
            },
        ])
        .then(async (answer) => {
            try {
                const result = await pool.query(
                    'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
                    [answer.title, answer.salary, answer.department_id]
                );
                console.log(
                    `Added role: ${result.rows[0].title} with salary ${result.rows[0].salary} in department ${result.rows[0].department_id}`
                );
                mainMenu();
            } catch (err) {
                console.error('Error adding role:', err);
                mainMenu();
            }
        });
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of the new employee:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name of the new employee:',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the role ID for the new employee:',
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager ID for the new employee (if any):',
            },
        ])
        .then(async (answer) => {
            try {
                const result = await pool.query(
                    'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
                    [
                        answer.first_name,
                        answer.last_name,
                        answer.role_id,
                        answer.manager_id,
                    ]
                );
                console.log(
                    `Added employee: ${result.rows[0].first_name} ${result.rows[0].last_name} with role ID ${result.rows[0].role_id} and manager ID ${result.rows[0].manager_id}`
                );
                mainMenu();
            } catch (err) {
                console.error('Error adding employee:', err);
                mainMenu();
            }
        });
};

const updateEmployeeRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee_id',
                message:
                    'Enter the ID of the employee whose role you want to update:',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the new role ID for the employee:',
            },
        ])
        .then(async (answer) => {
            try {
                const result = await pool.query(
                    'UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *',
                    [answer.role_id, answer.employee_id]
                );
                console.log(
                    `Updated employee ID ${result.rows[0].id} to new role ID ${result.rows[0].role_id}`
                );
                mainMenu();
            } catch (err) {
                console.error('Error updating employee role:', err);
                mainMenu();
            }
        });
};

mainMenu();
