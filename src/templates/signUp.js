import { authFunction, googleLogin } from '../lib/config/auth.js';

export const signup = (onNavigate) => {
  const signupSection = document.createElement('section');
  const signupForm = document.createElement('form');
  const closeBtn = document.createElement('button');
  const userLabel = document.createElement('label');
  const userInput = document.createElement('input');
  const emailLabel = document.createElement('label');
  const emailError = document.createElement('span');
  const emailInput = document.createElement('input');
  const passwordLabel = document.createElement('label');
  const passwordInput = document.createElement('input');
  const passwordError = document.createElement('span');
  const registerBtn = document.createElement('button');
  const returnArticle = document.createElement('article');
  const hasAccount = document.createElement('p');
  const hasAccountLink = document.createElement('a');
  const btnGoogle = document.createElement('button');
  const iconGoogle = document.createElement('img');

  signupSection.classList.add('signUp-section');
  signupForm.classList.add('signUp-form');
  closeBtn.classList.add('close-signUp');
  userLabel.classList.add('form');
  emailLabel.classList.add('form');
  emailError.classList.add('errormessage');
  passwordLabel.classList.add('form');
  passwordError.classList.add('errormessage');
  registerBtn.classList.add('btnRegister');
  returnArticle.classList.add('return-home');
  btnGoogle.classList.add('btnGoogle');

  userInput.setAttribute('type', 'text');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('id', 'userEmail');
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('id', 'userPassword');
  emailError.setAttribute('id', 'errorEmailMessage');
  passwordError.setAttribute('id', 'errorPassMessage');
  hasAccountLink.setAttribute('id', 'link-signUp');
  registerBtn.setAttribute('type', 'button');
  btnGoogle.setAttribute('type', 'button');
  iconGoogle.setAttribute('alt', 'Google icon');
  iconGoogle.setAttribute('src', 'images/googleIcon.png');

  userLabel.textContent = 'Nombre de Usuario';
  emailLabel.textContent = 'Correo Electronico';
  passwordLabel.textContent = 'Contraseña';
  registerBtn.textContent = 'Registrarse';
  hasAccount.textContent = '¿Ya tienes cuenta?';
  hasAccountLink.textContent = 'Ingresa aquí';

  closeBtn.innerHTML = '&times;';

  closeBtn.addEventListener('click', () => {
    onNavigate('/');
  });

  btnGoogle.appendChild(iconGoogle);
  btnGoogle.appendChild(document.createTextNode('Ingresa con Google'));

  registerBtn.addEventListener('click', () => {
    authFunction(emailInput, passwordInput, onNavigate, emailError, passwordError, userInput);
  });

  hasAccountLink.addEventListener('click', () => {
    onNavigate('/signin');
  });

  btnGoogle.addEventListener('click', () => {
    googleLogin(onNavigate);
  });

  returnArticle.appendChild(hasAccount);
  returnArticle.appendChild(hasAccountLink);
  signupForm.appendChild(closeBtn);
  signupForm.appendChild(userLabel);
  signupForm.appendChild(userInput);
  signupForm.appendChild(emailLabel);
  signupForm.appendChild(emailInput);
  signupForm.appendChild(emailError);
  signupForm.appendChild(passwordLabel);
  signupForm.appendChild(passwordInput);
  signupForm.appendChild(passwordError);
  signupForm.appendChild(registerBtn);
  signupForm.appendChild(btnGoogle);
  signupForm.appendChild(returnArticle);

  signupSection.appendChild(signupForm);

  return signupSection;
};

/*  section.innerHTML = `
  <form class="signUp-form">
    <label class="form"> Nombre de Usuario </label>
    <input type="text" >
    <label class="form"> Correo Electronico </label>
    <input type="email" id="userEmail">
    <span id="errorEmailMessage" class="errormessage"></span>
    <label class="form"> Contraseña </label>
    <input type="password" id="userPassword">
    <span id="errorPassMessage" class="errormessage"></span>
    <button class="btnRegister" type="submit">Registrarse</button>
    <article class="return-home">
      <p>¿Ya tienes cuenta?</p><a href="#" id="link-signUp">Ingresa aqui</a>
    </article>
  </form>

</section>`;

   */
