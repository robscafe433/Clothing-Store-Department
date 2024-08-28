INSERT INTO departments (department_name)
VALUES  ('show room'),
        ('warehouse'),
        ( 'office');

INSERT INTO roles (title, salary, department_id)
VALUES  ('floor clerk', 40000, 1),
        ('cashier', 50000, 1),
        ('stocker', 30000, 2),
        ('general manager', 80000, 1),
        ('assistant manager', 60000, 3);

INSERT INTO employees (first_name, last_name, role_id, employee_id)
VALUES  ('Crinage', 'Kev', 1, 1),
        ('Elga', 'Layne', 1, 2),
        ('Vanya', 'Lochead', 1, NULL),
        ('Anatol', 'Rollings', 2, NULL),
        ('James', 'Drakard', 2, NULL),
        ('Mellissa', 'Beer', 3, NULL),
        ('Kathryn', 'Daborn', 4, NULL),
        ('Lorinda', 'Joannidi', 5, NULL);
