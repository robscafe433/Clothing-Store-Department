-- View all departments
SELECT * FROM departments;

-- View all roles
SELECT roles.id, roles.title, roles.salary, departments.department_name
FROM roles
JOIN departments ON roles.department_id = departments.id;

-- View all employees
SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, employees.manager_id
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id;

-- Add a department
INSERT INTO departments (department_name) VALUES ('New Department Name');

-- Add a role
INSERT INTO roles (title, salary, department_id) VALUES ('New Role Title', 50000.00, 1);

-- Add an employee
INSERT INTO employees (first_name, last_name, role_id, employee_id) VALUES ('First Name', 'Last Name', 1, NULL);

-- Update an employee role
UPDATE employees SET role_id = 2 WHERE id = 1;
