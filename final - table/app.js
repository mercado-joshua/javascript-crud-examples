const employeeForm = () => {
    const employeeForm = document.querySelector('[data-js-employee-form]');
    const tbody = document.querySelector('[data-js-employee-table]').getElementsByTagName('tbody')[0];
    let selectedRow = null;

    // creates popup notifications
    const showAlert = (message, className) => {
        const div = document.createElement('div');
        const body = document.querySelector('[data-js-body]');
        const employeeForm = document.querySelector('[data-js-employee-form]');

        div.classList = `alert alert-${ className }`;
        div.append( document.createTextNode( message ) );

        body.insertBefore(div, employeeForm);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    };

    // get the data from the form
    const readFormData = () => {
        const empCode = document.querySelector('[data-js-empCode]');
        const salary = document.querySelector('[data-js-salary]');
        const fullname = document.querySelector('[data-js-fullname]');
        const city = document.querySelector('[data-js-city]');
        const formData = {};

        formData['empCode'] = empCode.value;
        formData['salary'] = salary.value;
        formData['fullname'] = fullname.value;
        formData['city'] = city.value;

        return formData;
    };

    // reset the form input values
    const resetForm = () => {
        const empCode = document.querySelector('[data-js-empCode]');
        const salary = document.querySelector('[data-js-salary]');
        const fullname = document.querySelector('[data-js-fullname]');
        const city = document.querySelector('[data-js-city]');

        empCode.value = '';
        salary.value = '';
        fullname.value = '';
        city.value = '';

        selectedRow = null;

    };

    // updates the selected row with new data
    const updateRecord = formData => {
        selectedRow.cells[0].textContent = formData.empCode;
        selectedRow.cells[1].textContent = formData.fullname;
        selectedRow.cells[2].textContent = formData.salary;
        selectedRow.cells[3].textContent = formData.city;
    };

    // inserts new data and creates new row into the table
    const insertNewRecord = data => {
        const table = document.querySelector('[data-js-employee-table]').getElementsByTagName('tbody')[0];

        // inserts new row
        const newRow = table.insertRow( table.length );

        // insert new cells into the newly created row
        empCodeCell = newRow.insertCell(0); // first cell
        empCodeCell.append( data.empCode );

        fullnameCell = newRow.insertCell(1); // second cell
        fullnameCell.append( data.fullname );

        salaryCell = newRow.insertCell(2); // third cell
        salaryCell.append( data.salary );

        cityCell = newRow.insertCell(3); // fourth cell
        cityCell.append( data.city );

        actionsCell = newRow.insertCell(4); // fifth cell
        actionsCell.innerHTML =  `<a href="#edit" data-js-edit-btn >Edit</a> <a href="#delete" data-js-delete-btn >Delete</a>`;

    };

    // deletes the selected row
    tbody.addEventListener('click', event => {
        const button = event.target;
        const row = button.parentElement.parentElement;
        const table = document.querySelector('[data-js-employee-table]');
        const empCode = document.querySelector('[data-js-empCode]');
        const salary = document.querySelector('[data-js-salary]');
        const fullname = document.querySelector('[data-js-fullname]');
        const city = document.querySelector('[data-js-city]');

        if ( button.hasAttribute( 'data-js-delete-btn' ) ) {
            if ( confirm( 'Are you sure to delete this record?' ) ) {

                table.deleteRow( row.rowIndex );
                resetForm();
                showAlert('Student Data Deleted', 'danger');

            }
        }

        // retrieve all the info from the selected row back to form
        if ( button.hasAttribute( 'data-js-edit-btn' ) ) {
            selectedRow = row;

            empCode.value = selectedRow.cells[0].textContent;
            fullname.value = selectedRow.cells[1].textContent;
            salary.value = selectedRow.cells[2].textContent;
            city.value = selectedRow.cells[3].textContent;

        }
    });

    employeeForm.addEventListener('submit', event => {
        event.preventDefault();
        const empCode = document.querySelector('[data-js-empCode]');
        const salary = document.querySelector('[data-js-salary]');
        const fullname = document.querySelector('[data-js-fullname]');
        const city = document.querySelector('[data-js-city]');
        const formData = readFormData();
        

        // basic form validation
        if ( !empCode.value || !salary.value || !fullname.value || !city.value ) {
            showAlert('Please fill out the form', 'danger');

        } else {
            if ( selectedRow === null ) {
                insertNewRecord( formData );
                showAlert('Student Added', 'success');
            } else {
                updateRecord( formData );
                showAlert('Student Edit', 'danger');
            }
        
            resetForm();    
        }
    });
};

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') employeeForm();
});