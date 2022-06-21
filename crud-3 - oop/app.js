const employeeForm = document.querySelector('[data-js-employee-form]');
const empName = document.querySelector('[data-js-name]');
const email = document.querySelector('[data-js-email]');
const mobile = document.querySelector('[data-js-mobile]');
const tbody = document.querySelector('[data-js-employee-table]').getElementsByTagName('tbody')[0];
const contentID = document.querySelector('[data-js-content-id]');
const submitBtn = document.querySelector('[data-js-submit]');

class Employee {
    constructor( id, name, email, mobile ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    };

    static displayData () {
        if (localStorage.getItem('employees')) {
            JSON.parse(localStorage.getItem('employees')).forEach(employee => {
                Employee.generateRow( employee.id, employee.name, employee.email, employee.mobile);
            });
        }
    };

    static generateRow ( id, name, email, mobile) {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${ id }</td>
            <td>${ name }</td>
            <td>${ email }</td>
            <td>${ mobile }</td>
            <td>
                <a href="#edit" data-js-edit-btn data-js-id="${ id }">Edit</a> 
                <a href="#delete" data-js-delete-btn data-js-id="${ id }">Delete</a>
            </td>
        `;

        tbody.append(tr);
    };

    static resetForm () {
        employeeForm.reset();
    };

    insertData() {
        Employee.generateRow( this.id, this.name, this.email, this.mobile );
        return this; // used to chain methods
    };

    storeData () {
        // create a storage
        const employeeData = JSON.parse(localStorage.getItem('employees')) || [];

        // add the data
        employeeData.push({
            id: this.id,
            name: this.name,
            email: this.email,
            mobile: this.mobile
        });

        localStorage.setItem('employees', JSON.stringify(employeeData));
    };

    updateData(id) {
        const newItem = {
            id: id,
            name: this.name,
            email: this.email,
            mobile: this.mobile
        };

        const updateEmployee = JSON.parse(localStorage.getItem( 'employees' ))
            .map(employee => {
                if ( employee.id == id ) return newItem;
                return employee;
            });

        localStorage.setItem('employees', JSON.stringify( updateEmployee ));
    };
};

// populate all data into the table
Employee.displayData();


// insert new data or update existing data
employeeForm.addEventListener('submit', event => {
    event.preventDefault();

    if ( !contentID.value ) {
        const uuid = () => { 
            const id = Math.floor( Math.random() * 1000 );
            return id;
        };
    
        const newEmployee = new Employee( uuid(), empName.value, email.value, mobile.value );
        newEmployee.insertData().storeData();

    } else {
        const id = contentID.value;
        const employee = new Employee( id, empName.value, email.value, mobile.value );
        employee.updateData(id);
        submitBtn.value = 'submit';

        tbody.innerHTML = ''; // remove all rows
        Employee.displayData(); // display new rows
    }

    Employee.resetForm();
});

tbody.addEventListener('click', event => {
    const button = event.target;
    const row = button.parentElement.parentElement;

    // deletes the selected row
    if ( button.hasAttribute( 'data-js-delete-btn' ) ) {
        if ( confirm( 'Are you sure to delete this record?' ) ) {

            const id = button.getAttribute( 'data-js-id' );
            const employeeData = JSON.parse(localStorage.getItem( 'employees' ));

            // removes the employee by using its id
            const newData = employeeData.filter( employee => employee.id != id );
            localStorage.setItem('employees', JSON.stringify( newData ));

            // remove row from the table
            row.remove();
        }
    }

    // retrieve all the info from the selected row back to the form
    if ( button.hasAttribute( 'data-js-edit-btn' ) ) {

            const id = button.getAttribute( 'data-js-id' );

            // retrieve the employee data by its id
            const employee = JSON.parse(localStorage.getItem( 'employees' )).find(employee => employee.id == id);

            empName.value = employee.name;
            email.value = employee.email;
            mobile.value = employee.mobile;

            contentID.value = id;
            submitBtn.value = 'Edit this Employee';
    }
});