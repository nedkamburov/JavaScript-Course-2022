const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const dbRequest = indexedDB.open('StorageDummy', 1);
let db;

dbRequest.onsuccess = function (event) {
     db = event.target.result;
}

dbRequest.onupgradeneeded = function (event) {
     db = event.target.result;
    const objStore = db.createObjectStore('products', {keyPath: 'id'});

    objStore.transaction.oncomplete = function(event) {
        const productStore = db.transaction('products', 'readwrite').objectStore('products');
        productStore.add({id: 'p1', title: 'One small product', price: 21.99});
    }
};
dbRequest.onerror = function (event) {
    console.log("Error!")
};

const user = {
    name: 'Peshi',
    age: 28
}

storeBtn.addEventListener('click', () => {
    if (!db) {
        return;
    }
    const productStore = db.transaction('products', 'readwrite').objectStore('products');
    productStore.add({id: 'p2', title: 'One larger product', price: 21.99});
})

retrieveBtn.addEventListener('click', () => {
    const productStore = db.transaction('products', 'readwrite').objectStore('products');
    const request = productStore.get('p2');
    request.onsuccess = function () {
        console.log(request.result);
    }
    
})