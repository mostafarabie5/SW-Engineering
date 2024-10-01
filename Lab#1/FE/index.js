function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = '';
      const list = data.data;
      list.forEach((item) => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}

// TODO
// add event listener to submit button
const submitButton = document.querySelector('.btn.btn-primary.mt-3');

// Add event listener to the submit button
submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  createEmployee();
});

// TODO
// add event listener to delete button
document.addEventListener('click', function (event) {
  if (event.target && event.target.matches('.btn.btn-danger.btn-sm')) {
    const row = event.target.closest('tr');
    const idCell = row.querySelector('td');
    const employeeId = idCell.textContent;
    deleteEmployee(employeeId);
  }
});

// TODO
function createEmployee() {
  // get data from input field
  // send data to BE
  // call fetchEmployees

  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;

  if (id && name) {
    fetch('http://localhost:3000/api/v1/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name }),
    })
      .then((response) => {
        if (response.status === 201) fetchEmployees();
        else
          response.json().then((data) => {
            alert(data.message);
          });
      })

      .catch((error) => console.error(error));
  } else alert('Both fields are required.');
}

// TODO
function deleteEmployee(employeeId) {
  // get id
  // send id to BE
  // call fetchEmployees

  fetch(`http://localhost:3000/api/v1/employee/${employeeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 200) fetchEmployees();
      else response.json().then((data) => alert(data.message));
    })
    .catch((error) => console.error(error));
}

fetchEmployees();
