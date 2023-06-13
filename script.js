const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const userList = document.querySelector('.user-list');

searchButton.addEventListener('click', searchUsers);

//Search button functionality
async function searchUsers() {
    const username = searchInput.value;

    // Clear previous results
    userList.innerHTML = '';

    try {
        //fetching data through api
        const response = await fetch(`https://api.github.com/search/users?q=${username}`);
        const data = await response.json();
        //iterating user data
        data.items.forEach(user => {
            const listItem = document.createElement('li');
            listItem.classList.add('user-list-item');
            //user-avatar data
            const avatar = document.createElement('img');
            avatar.classList.add('user-avatar');
            avatar.src = user.avatar_url;
            avatar.alt = `${user.login}'s Avatar`;
            listItem.appendChild(avatar);
            //user-name data
            const usernameLink = document.createElement('a');
            usernameLink.classList.add('user-username');
            usernameLink.href = user.html_url;
            usernameLink.target = '_blank';
            usernameLink.textContent = user.login;
            listItem.appendChild(usernameLink);
            //appending listItem to userList
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
