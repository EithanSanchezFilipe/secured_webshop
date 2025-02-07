const response = await fetch('/api/user/', {
  method: 'get',
});
if (response.ok) {
  const usernameField = document.getElementById('');
  const passwordField = document.getElementById('');

  const data = response.json();
  console.log(data);
  console.log('Utilisateur déconnecté avec succès');
} else {
  console.log("L'utilisateur na pas pu être déconnecté");
}
