const poemList = document.querySelector('.poems');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if(user) {
    if(user.admin) {
        adminItems.forEach(item => item.style.display = 'block');
    }
    //show account info
    db.collection('users').doc(user.uid).get().then(doc => {
    const html = `
      <div>Logged in as ${user.email}</div>
      <div>${doc.data().bio}</div>
      <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    });

    //show users elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }
  else {
    //hide account info
    accountDetails.innerHTML = '';
    //show users elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

//setup poems list
const setupPoems = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const poem = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4">${poem.name}</div>
          <div class="collapsible-body white">${poem.content}</div>
        </li>
      `;
      html += li
    });

    poemList.innerHTML = html;
  }
  else {
    poemList.innerHTML = '<h5>Login to view poems list</h5>';
  }
};

// link materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });
