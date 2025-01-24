document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username.value,
          password: form.password.value,
          email: form.email.value,
        }),
      });
    });
  }
});
