INSERT INTO department
(name)
VALUES 
('Kitchen Staff'),
('Floor Staff'),
('Bartending staff'),
('Delivery Staff');

INSERT INTO role 
(title, salary, department_id)
VALUES
('Chef', 40000, 1),
('Waiter', 25000, 2),
('Bartender', 23000,3),
('Delivery worker', 15000,4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Kanye', 'West', 1, 3),
('Bob', 'Marley', 2, 1),
('Adam', 'Levine', 3, 5),
('Katy', 'Perry', 4, 2);