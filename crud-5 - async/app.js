const postList = document.querySelector('[data-js-post-list]');
const blogpostForm = document.querySelector('[data-js-blogpost-form]');
const title = document.querySelector('[data-js-title]');
const content = document.querySelector('[data-js-content]');
const submitBtn = document.querySelector('[data-js-submit-btn]');
const URL = 'https://jsonplaceholder.typicode.com/posts';
let output = '';

// GET - read the posts
// Method: GET
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

const fetchPosts = async () => {
    try {
        const response = await fetch( URL );

        if ( !response.ok ) throw new Error( `Failed to fetch data from the API` );

        const data = await response.json();
        renderPosts( data );
            
    } catch (error) {
        console.error(`Error found: ${ error.message }`);
    }
};

fetchPosts();

const updatePost = async () => {
    try {
        const response = await fetch(`${ URL }/${ id }`, { 
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                title: title.value,
                body: content.value
            })
        });

        if ( !response.ok ) throw new Error( `Failed to update existing data` );

        location.reload();

    } catch (error) {
        console.error(`Error found: ${ error.message }`);
    }
};

const deletePost = async (id) => {
    try {
        const response = await fetch(`${ URL }/${ id }`, { method: 'DELETE' });

        if ( !response.ok ) throw new Error( `Failed to delete existing data` );

        location.reload();
            
    } catch (error) {
        console.error(`Error found: ${ error.message }`);
    }
};

postList.addEventListener('click', (event) => {
    event.preventDefault();

    const action = event.target.getAttribute('id');
    const id = event.target.parentElement.getAttribute('data-js-post-id');
    const isDeleteBtnPressed = action === 'delete';
    const isEditBtnPressed = action === 'edit';

    // DELETE - remove existing post
    // method: DELETE
    if (isDeleteBtnPressed) {
        deletePost(id);
    }

    if (isEditBtnPressed) {
        const card = event.target.parentElement;
        const cardTitle = card.querySelector('[data-js-card-title]');
        const cardContent = card.querySelector('[data-js-card-content]');

        // retrievr the data back to the form
        title.value = cardTitle.textContent;
        content.value = cardContent.textContent;
    }

    // Update - update the existing post
    // Method - PATCH
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        updatePost(id);
        blogpostForm.reset();
    });
});

// Create - new post
// Method: POST

const insertNewPost = async () => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                title: title.value,
                body: content.value
            })
        });

        if ( !response.ok ) throw new Error( `Failed to insert new data` );

        const data = await response.json();
        const dataList = [];
        dataList.push(data);

        renderPosts(dataList);
            
    } catch (error) {
        console.error(`Error found: ${ error.message }`);
    }
};

blogpostForm.addEventListener('submit', (event) => {
    event.preventDefault();

    insertNewPost();
    blogpostForm.reset();
});