const toyCollection = document.querySelector('[data-js-toy-collection]');
const toyForm = document.querySelector('[data-js-toy-form]');

const title = document.querySelector('[data-js-toy-title]');
const body = document.querySelector('[data-js-toy-body]');

const renderToys = (toys) => {
    toyCollection.innerHTML = '';
  
    toys.forEach(toy => {
      toyCollection.innerHTML += `
          <div class="card" data-id=${ toy.id }>
              <h2 data-js-toy-title>${ toy.title }</h2>
              <p data-js-toy-body>${ toy.body }</p>
  
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
          </div>
          `;
    });
}; 


// GET
const fetchToys = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(resp => resp.json())
        .then(renderToys);
};

fetchToys();

// POST
toyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            title: title.value,
            body: body.value
        })
    })
        .then(resp => resp.json())
        .then(renderToys);

    toyForm.reset();
});

toyCollection.addEventListener('click', (event) => {
    event.preventDefault();

    const isEditButtonPressed = event.target.className === 'edit-btn';
    const isDeleteButtonPressed = event.target.className === 'delete-btn';

    // PATCH
    if ( isEditButtonPressed ) {
        console.log('edit');

        const toyCard = event.target.parentElement;
        console.log(toyCard);

        const toyID = toyCard.dataset.id;
        const toyTitle = toyCard.querySelector('[data-js-toy-title]');
        const toyBody = toyCard.querySelector('[data-js-toy-body]');

        // retrieve the data back to the form
        title.value = toyTitle.textContent;
        body.value = toyBody.textContent;

        fetch(`https://jsonplaceholder.typicode.com/posts/${ toyID }`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                title: title.value,
                body: body.value
            })
        })
            .then(response => response.json());

        toyForm.reset();
    }

    // DELETE
    else if ( isDeleteButtonPressed ) {
        console.log('delete');

        const toyID = event.target.parentElement.dataset.id;

        fetch(`https://jsonplaceholder.typicode.com/posts/${ toyID }`, {
          method: 'DELETE'
        })
            .then(response => response.json())
            .then(fetchToys);
    }

});

