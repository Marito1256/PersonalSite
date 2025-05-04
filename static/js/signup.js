document.getElementById('signup-form').addEventListener('submit', async function (e){
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const passwordCheck = document.getElementById('password-check').value;
    const response = await fetch(
        '/SignUp',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username:username, password:password, passwordCheck:passwordCheck})
        }
    );
    const result = await response.json();
    if(result.success){
        window.location.href = '/';
    }
    else{
        const errorDiv = document.getElementById(result.message);
        errorDiv.textContent = result.message;
        errorDiv.classList.remove('d-none');
    }
});
// document.getElementById('signup-form').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const username = document.getElementById('username').value.trim();
//     const password = document.getElementById('password').value;
//     const passwordCheck = document.getElementById('password-check').value;

//     const response = await fetch('/SignUp', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             username: username,
//             password: password,
//             passwordCheck: passwordCheck
//         })
//     });

//     const result = await response.json(); // ✅ fix from calling response()

//     if (result.success) {
//         window.location.href = '/';
//     } else {
//         const errorDiv = document.getElementById('signupError');
//         if (result.message === 'usernameError') {
//             errorDiv.textContent = 'Username already taken.';
//         } else if (result.message === 'passwordCheck') {
//             errorDiv.textContent = 'Passwords do not match.';
//         } else {
//             errorDiv.textContent = 'Something went wrong.';
//         }
//         errorDiv.classList.remove('d-none');
//     }
// });
