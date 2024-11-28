document.getElementById("icon-button").addEventListener("click", function () {
    const loginPage = document.querySelector(".login-page");
  
    if (loginPage.style.display === "none" || !loginPage.style.display) {
      // Mostrar o card
      loginPage.style.display = "block";
      setTimeout(() => {
        loginPage.style.opacity = 1;
      }, 10); // Pequeno atraso para ativar a transição
    } else {
      // Esconder o card
      loginPage.style.opacity = 0;
      setTimeout(() => {
        loginPage.style.display = "none";
      }, 500); // Duração da transição (0.5s)
    }
  });

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const registerLink = document.getElementById("register-link");
  const loginLink = document.getElementById("login-link");   
  
  
  registerLink.addEventListener("click",   
   function (event) {
    event.preventDefault(); // Prevent default link behavior
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });
  
  loginLink.addEventListener("click", function (event) {
    event.preventDefault();   
   // Prevent default link behavior
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });