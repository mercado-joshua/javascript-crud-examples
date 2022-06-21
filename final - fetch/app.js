const employeeForm = () => {
    const postList = document.querySelector('[data-js-post-list]');
    const blogpostForm = document.querySelector('[data-js-blogpost-form]');
    const submitBtn = document.querySelector('[data-js-submit-btn]');
    
    const title = document.querySelector('[data-js-title]');
    const content = document.querySelector('[data-js-content]');
    
    const URL = 'https://jsonplaceholder.typicode.com/posts';
    let output = '';
    
    // creates list of cards
    const renderPosts = (posts) => {
        posts.forEach(post => {
            output += `
                <div data-js-post-id="${ post.id }" class="post" style="display: inline-block; width: 300px; margin: 1rem; padding: 1rem; border: 1px solid #000;">
                    <h2 class="title" data-js-card-title>${ post.title }</h2>
                    <p class="content" data-js-card-content>${ post.body }</p>
    
                    <a href="#edit" id="edit">Edit</a>
                    <a href="#delete" id="delete">Delete</a>
                </div>
            `;
    
            postList.innerHTML = output;
        });
    };
    
    // Reads/fetch data from the API
    // method: GET
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            // get individual post
            renderPosts(data);
        })
        .catch(error => {
            console.error(`ERROR: ${ error }`)
        });
    
    
    postList.addEventListener('click', (event) => {
        event.preventDefault();
    
        const action = event.target.getAttribute('id');
        const id = event.target.parentElement.getAttribute('data-js-post-id');
        const isDeleteBtnPressed = action === 'delete';
        const isEditBtnPressed = action === 'edit';
    
        // remove existing post
        // method: DELETE
        if (isDeleteBtnPressed) {
            fetch(`${ URL }/${ id }`, { method: 'DELETE' })
                .then(response => response.json())
                .then(() => location.reload()) // reload the browser
                .catch(error => {
                    console.error(`Failed to delete data: ${ error }`)
                });
        }
    
        // retrieve the data back to the form
        if (isEditBtnPressed) {
            const card = event.target.parentElement;
            const cardTitle = card.querySelector('[data-js-card-title]');
            const cardContent = card.querySelector('[data-js-card-content]');
    
            title.value = cardTitle.textContent;
            content.value = cardContent.textContent;
        }
    
        // updates the existing post
        // Method - PATCH
        submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
    
            fetch(`${ URL }/${ id }`, { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    title: title.value,
                    body: content.value
                })
            })
                .then(response => response.json())
                .then(() => location.reload())
                .catch(error => {
                    console.error(`Failed to update post: ${ error }`)
                });
    
            blogpostForm.reset();
        });
    });
    
    // creates new post
    // Method: POST
    blogpostForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        console.log('hello');
    
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                title: title.value,
                body: content.value
            })
        })
            .then(response => response.json())
            .then(data => {
                const dataList = [];
                dataList.push(data);
    
                renderPosts(dataList);
            })
            .catch(error => {
                console.error(`Failed to create new post: ${ error }`)
            });
    
            blogpostForm.reset();
    });
};

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') employeeForm();
});