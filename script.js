document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('postForm');
    const postText = document.getElementById('postText');
    const feed = document.getElementById('feed');

    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const postContent = postText.value.trim();
        if (!postContent) return; // Ignore empty posts

        // Create a unique ID for each post
        const postId = 'post-' + Date.now();

        // Create the post element
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.setAttribute('id', postId);
        postElement.innerHTML = `
            <div class="tweet">
                <div id="text">
                    <p>${postContent}</p>
                </div>
                <form class="comment-form">
                    <textarea placeholder="Add a comment"></textarea>
                    <button type="submit" class="button">Comment</button>
                </form>
            </div>
        `;

        // Add the post to the feed
        feed.appendChild(postElement);

        // Save the post to local storage
        savePostToLocalStorage(postId, postContent);

        // Clear the post input
        postText.value = '';
    });

    // Event delegation for handling comments
    feed.addEventListener('submit', function(event) {
        if (event.target.classList.contains('comment-form')) {
            event.preventDefault();

            const commentInput = event.target.querySelector('textarea');
            const commentText = commentInput.value.trim();
            if (!commentText) return; // Ignore empty comments

            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<p>${commentText}</p>`;

            const tweet = event.target.closest('.tweet');
            tweet.appendChild(commentElement);

            commentInput.value = ''; // Clear the comment input
        }
    });

    // Load existing posts from local storage on page load
    loadPostsFromLocalStorage();

    function savePostToLocalStorage(postId, postContent) {
        let posts = JSON.parse(localStorage.getItem('posts')) || {};
        posts[postId] = postContent;
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPostsFromLocalStorage() {
        let posts = JSON.parse(localStorage.getItem('posts')) || {};
        for (let postId in posts) {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.setAttribute('id', postId);
            postElement.innerHTML = `
                <div class="tweet">
                    <div id="text">
                        <p>${posts[postId]}</p>
                    </div>
                    <form class="comment-form">
                        <textarea placeholder="Add a comment"></textarea>
                        <button type="submit" class="button">Comment</button>
                    </form>
                </div>
            `;
            feed.appendChild(postElement);
        }
    }
});