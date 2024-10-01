const employee = [{ id: '1', name: 'Mohamed Sayed' }];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  const index = checkIfExist(id);
  const found = index !== employee.length;
  
  if (found) employee.splice(index, 1);

  const message = found
    ? 'The Employee is deleted successfully'
    : 'There is no employee with that id';

  const statusCode = found ? 200 : 404;
  const status = found ? 'success' : 'fail';

  res.status(statusCode).json({
    status: status,
    message: message,
  });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;

  const index = checkIfExist(id);
  if (index !== employee.length)
    return res.status(400).json({
      status: 'fail',
      message: 'There exist employee with that id',
    });

  const newEmployee = { id: id, name: name };
  employee.push(newEmployee);
  res.status(201).json({
    status: 'success',
    message: 'The Employee is created successfully.',
  });
};

const checkIfExist = (id) => {
  let i = 0;
  for (i = 0; i < employee.length; i++) {
    if (employee[i]['id'] == id) {
      break;
    }
  }
  return i;
};
