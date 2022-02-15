const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const userId = 'user1234';
const user = {
    name: 'Peshi',
    age: 28,
    hobbies: ['Sports', 'Cooking']
}

storeBtn.addEventListener('click', () => {
    sessionStorage.setItem('uid', userId);
    localStorage.setItem('user', JSON.stringify(user));
})

retrieveBtn.addEventListener('click', () => {
    const extractedId = sessionStorage.getItem('uid');
    const extractedUser = JSON.parse(localStorage.getItem('user'));

    if (extractedId) {
        console.log(extractedId);
    }
    if (extractedUser){
        console.log(extractedUser);
    } else {
        console.log('Couldn\'t find an id or user');
    }
})