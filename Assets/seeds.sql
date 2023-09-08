INSERT INTO department (departmentName)
VALUES
  (1,'Human Resources'),
  (2, 'Technical'),
  (3, 'Marketing'),
  (4, 'Finance'),
  (5, 'Sales'),
  (6, 'Engineering'),
  (7, 'Legal');
  
INSERT INTO role (title, salary, departmentId)
VALUES
  ('Recruiter ', 20000, 1),
  ('Marketer', 30000, 3),
  ('Developer', 40000, 2),
  ('Legal', 90000, 7),
  ('Salesperson', 80000, 5),
  ('Engineer', 70000, 6),
  ('Accountant', 68000, 7),
  ('Sales Lead', 92000, 5),
  ('CEO', 120000, 5);

INSERT INTO employee (firstName, lastName, roleId, managerId)
VALUES
  ('Jamie', 'Perry', 1, 1),
  ('Coral', 'Conley', 2, 2),
  ('Macy', 'Pollard', 3, 1),
  ('Jack', 'Guerra', 4, 3),
  ('Safiya', 'Herman', 5, 1),
  ('Kan', 'Hatfield', 6, 3);
  ('Tori', 'Thornton', 2, 3);
  ('Dewey', 'Barnes', 5, 1);