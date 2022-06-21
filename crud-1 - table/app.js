const employeeForm = document.querySelector('[data-js-employee-form]');
let selectedRow = null;

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

const editSelectedRow = td => {
    selectedRow = td.parentElement.parentElement; // get the nearest <tr></tr>
    const empCode = document.querySelector('[data-js-empCode]');
    const salary = document.querySelector('[data-js-salary]');
    const fullname = document.querySelector('[data-js-fullname]');
    const city = document.querySelector('[data-js-city]');

    empCode.value = selectedRow.cells[0].textContent;
    fullname.value = selectedRow.cells[1].textContent;
    salary.value = selectedRow.cells[2].textContent;
    city.value = selectedRow.cells[3].textContent;

    console.log(selectedRow);
};

const updateRecord = formData => {
    selectedRow.cells[0].textContent = formData.empCode;
    selectedRow.cells[1].textContent = formData.fullname;
    selectedRow.cells[2].textContent = formData.salary;
    selectedRow.cells[3].textContent = formData.city;
};

const deleteSelectedRow = td => {
    const row = td.parentElement.parentElement;
    const table = document.querySelector('[data-js-employee-list]');

    if ( confirm( 'Are you sure to delete this record?' ) ) {
        table.deleteRow( row.rowIndex );
        resetForm();
    }
};

const insertNewRecord = data => {
    const table = document.querySelector('[data-js-employee-list]').getElementsByTagName('tbody')[0];

    // inserts new row
    const newRow = table.insertRow( table.length );

    // insert new cells into the newly created row
    cellOne = newRow.insertCell(0); // first cell
    cellOne.append( data.empCode );

    cellTwo = newRow.insertCell(1); // second cell
    cellTwo.append( data.fullname );

    cellThree = newRow.insertCell(2); // third cell
    cellThree.append( data.salary );

    cellFour = newRow.insertCell(3); // fourth cell
    cellFour.append( data.city );

    cellFifth = newRow.insertCell(4); // fifth cell
    cellFifth.innerHTML =  `<a href="#edit" onClick="editSelectedRow(this);">Edit</a> 
    <a href="#delete" onClick="deleteSelectedRow(this);">Delete</a>`;

};

employeeForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = readFormData();
    
    if ( selectedRow === null ) {
        insertNewRecord( formData );
    } else {
        updateRecord( formData );
    }

    resetForm();
});