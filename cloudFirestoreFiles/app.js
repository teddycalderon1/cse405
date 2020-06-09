const coffeeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//create element and provide shop name
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    coffeeList.appendChild(li);

    //deleting coffee shops with x
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Coffee Shops').doc(id).delete();
    })
}

//get data from cloud firestore database in order *uppercase goes before lowercase
/*db.collection('Coffee Shops').where('city', '==', 'Rialto').orderBy('name').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    })
})
*/

//save data for new coffee shop
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Coffee Shops').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
});

/*real-time listener- delete and add w/o having to refresh
update on console on app like, can switch between name and city:
db.collection('Coffee Shops').doc('put in id from firestore').update({
    name: 'put changes here'
}) and refresh or override with set by using .set instead of .update but deltes other input */
db.collection('Coffee Shops').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added') {
            renderCafe(change.doc);
        }
        else if(change.type == 'removed') {
            let li = coffeeList.querySelector('[data-id=' + change.doc.id + ']');
            coffeeList.removeChild(li);
        }
    });
})
