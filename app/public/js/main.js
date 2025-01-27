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
    });
  }
});
