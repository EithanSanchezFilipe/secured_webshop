document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerForm.username.value,
          password: registerForm.password.value,
          email: registerForm.email.value,
        }),
      });
      if (response.ok) {
        window.location.href = '/login';
        console.log('Utilisateur créé avec succès');
      } else {
        console.log("L'utilisateur na pas pu être créé");
      }
    });
  }
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginForm.username.value,
          password: loginForm.password.value,
        }),
      });
      if (response.ok) {
        window.location.href = '/home';
        console.log('Utilisateur connécté');
      } else {
        console.log("l'utilisateur n'a pas pu être connécté");
      }
    });
  }
});
