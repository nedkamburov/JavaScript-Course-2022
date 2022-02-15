const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const user = {
    name: 'Peshi',
    age: 28
}

storeBtn.addEventListener('click', () => {
    const userId = 'user1234';
//    document.cookie = ''; // adding one value
    document.cookie = `uid=${userId}; max-age=50`; // expiration set in seconds
    document.cookie = `user=${JSON.stringify(user)}`;
})

retrieveBtn.addEventListener('click', () => {
//    console.log(document.cookie); // access all cookies together
const cookieData = document.cookie.split(';');

const data = cookieData.map(c => {
    return c.trim();
});

console.log(data);

})