let selectedRow = null;
const form = document.querySelector('[data-js-form]');
const tbody = document.querySelector('[data-js-tbody]');

const showAlert = (message, className) => {
    const div = document.createElement('div');
    const body = document.querySelector('[data-js-body]');
    const form = document.querySelector('[data-js-form]');

    div.classList = `alert alert-${ className }`;
    div.append( document.createTextNode( message ) );

    body.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
};

const resetForm = () => {
    const firstname = document.querySelector('[data-js-firstname]');
    const lastname = document.querySelector('[data-js-lastname]');
    const rollno = document.querySelector('[data-js-rollno]');

    firstname.value = '';
    lastname.value = '';
    rollno.value = '';
};

// add data
form.addEventListener('submit', event => {
    event.preventDefault();

    const firstname = document.querySelector('[data-js-firstname]');
    const lastname = document.querySelector('[data-js-lastname]');
    const rollno = document.querySelector('[data-js-rollno]');

    // validation
    if (!firstname.value || !lastname.value || !rollno.value ) {
        showAlert('Please fill out the form', 'danger');
    } else {
        if ( selectedRow == null ) {
            const tbody = document.querySelector('[data-js-tbody]');
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${ rollno.value }</td>
                <td>${ firstname.value }</td>
                <td>${ lastname.value }</td>
                <td>
                    <a href="#" class="edit">Edit</a>
                    <a href="#" class="delete" data-js-delete-btn>Delete</a>
                </td>
            `;

            tbody.append(row);
            selectedRow = null;
            showAlert('Student Added', 'success');
        } else {
            selectedRow.children[0].textContent = rollno.value; 
            selectedRow.children[1].textContent = lastname.value;
            selectedRow.children[2].textContent = firstname.value;
        }

        resetForm();
    }

    console.log('test');
});

// delete data
tbody.addEventListener('click', event => {
    const target = event.target;

    if ( target.classList.contains('delete') ) {
        target.parentElement.parentElement.remove();
        showAlert('Student Data Deleted', 'danger');
    }
});

// edit data
tbody.addEventListener('click', event => {
    const target = event.target;
    const firstname = document.querySelector('[data-js-firstname]');
    const lastname = document.querySelector('[data-js-lastname]');
    const rollno = document.querySelector('[data-js-rollno]');

    if ( target.classList.contains('edit') ) {
        selectedRow = target.parentElement.parentElement;

        firstname.value = selectedRow.children[2].textContent;
        lastname.value = selectedRow.children[1].textContent;
        rollno.value = selectedRow.children[0].textContent;

        showAlert('Student Edit', 'danger');
    }
});