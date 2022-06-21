// https://betterprogramming.pub/build-a-crud-js-app-with-fetches-f82143a48b6d
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();

    const postForm = document.querySelector('[data-js-post-form]');
    const blogPosts = document.querySelector('[data-js-blogposts]');
    const updateInfo = document.querySelector('[data-js-update-info]');

    // Helper functions

    const gatherFormData = (event) =>{

        // get value from the form using name="" attribute 
        return {
            title: event.target.title.value,
            body: event.target.body.value
        };
    };

    // POST
    const createNewPost = (event) => {
        event.preventDefault();
        const newPost = gatherFormData(event);

        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => (renderPostCard(data)));
    };

    // DELETE
    const deletePost = (post) => {
        const postCard = document.querySelector(`[data-id="${ post.id }"]`);

        return  fetch(`https://jsonplaceholder.typicode.com/posts/${ post.id }`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => postCard.remove());
    };

    // PATCH

    // [4] - updates the browser
    const updateOnFrontEnd = (post) => {
        const updateCard = blogPosts.querySelector(`[data-id="${ post.id }"] > .contentbox`);
        const updateForm = document.querySelector('[data-js-update-info] > form');
            updateCard.innerText = `
                <h2>${ post.title }</h2>
                <p>${ post.body }</p>
            `;

        updateForm.remove(); // remove the form
    };

    // [3] - updates the api
    const updateOnBackend = (editedPost, id) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${ id }`, {
            method: 'PATCH',
            body: JSON.stringify(editedPost),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json());
    };

    // [2] - gather info and update it both from API and the browser
    const updatePost = (event, post) => {
        event.preventDefault();
        const editedPost = gatherFormData(event);

        updateOnBackend(editedPost, post.id)
            .then(updateOnFrontEnd);
    };

    // [1] - create a from and retrieve the values from the selected card
    const editPost = (post) => {
        const updateForm = document.createElement('form');
            updateForm.id = 'update-form';
            updateForm.innerHTML = `
                <h2> Update ${ post.title }</h2>
                <p><label>Title: <input 
                    type="text" 
                    value="${ post.title }"
                    name="title" 
                /></label></p>

                <p><label>Body: <input 
                    type="text" 
                    value="${ post.body }"
                    name="body"
                /></label></p>

                <p><input type="submit" name="submit"></p>
            `;
            updateInfo.append(updateForm);

            updateForm.addEventListener('submit', (event) => updatePost(event, post));
    };

    // GET
    const renderPostCard = (post) => {
        const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.id = post.id
            card.innerHTML = `
                <div class="contentbox">
                    <h2>${ post.title }</h2>
                    <p>${ post.body }</p>
                </div>
            `;
            blogPosts.append(card);

        const deleteBtn = document.createElement('button');
            deleteBtn.dataset.id = post.id;
            deleteBtn.setAttribute('id', `delete-btn-${ post.id }`);
            deleteBtn.innerText = 'DELETE';

            card.append(deleteBtn);

            deleteBtn.addEventListener('click', () => deletePost(post));

        const updateBtn = document.createElement('button')
            updateBtn.dataset.id = post.id
            updateBtn.setAttribute('id', `update-btn-${ post.id }`)
            updateBtn.innerText = 'UPDATE';

            card.append(updateBtn);

            updateBtn.addEventListener('click', () => editPost(post));
    };

    const fetchPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')  
            .then(response => response.json())  
            .then(data => data.forEach(renderPostCard));
    };

    fetchPosts();

    postForm.addEventListener('submit', (event) => {
        createNewPost(event);
        postForm.reset();
    });
});