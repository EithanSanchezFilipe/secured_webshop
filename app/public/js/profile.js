// import e = require("express");

document.addEventListener('DOMContentLoaded', async function () {
  const response = await fetch('/api/user/', {
    method: 'get',
  });
  if (response.ok) {
    const usernameField = document.getElementById('username');
    const emailField = document.getElementById('userEmail');

    const data = await response.json();
    console.log(data.data.username, data.data.email);
    usernameField.value = data.data.username;
    emailField.value = data.data.email;

    document.getElementById('username').value = data.data.email;

    console.log('Les informations ont pu être récupérées');
  } else {
    console.log("Les informations n'ont pas pu être récupérées");
  }
});
