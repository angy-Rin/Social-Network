/**
 * @jest-environment jsdom
 */
/* eslint-disable jest/no-focused-tests */
/* eslint-disable max-len */
import { home } from '../src/templates/home.js';
import { signup } from '../src/templates/signUp.js';
import { googleLogin } from '../src/lib/config/auth.js';
import { errorMessages } from '../src/lib/index.js';

jest.mock('../src/lib/config/auth', () => ({
  googleLogin: jest.fn(),
  login: jest.fn(),
  registerUserWithEmailAndPassword: jest.fn(),
}));

describe('home', () => {
  it('home debe ser una función', () => {
    expect(typeof home).toBe('function');
  });

  it('existe un botón signup', () => {
    const container = document.createElement('section');
    container.append(home());
    const btnSignUp = container.querySelector('.btnSignUp');
    expect(btnSignUp).not.toBe(null);
  });

  test('navega a la sección signUp', () => {
    const container = document.createElement('section');
    const onNavigate = jest.fn();
    container.append(home(onNavigate));
    const btnSignUp = container.querySelector('.btnSignUp');
    btnSignUp.click();
    expect(onNavigate).toHaveBeenCalledWith('/signup');
  });

  it('existe un botón signin', () => {
    const container = document.createElement('section');
    container.append(home());
    const bottonLogin = container.querySelector('.btnSignIn');
    expect(bottonLogin).not.toBe(null);
  });

  test('navega a la sección signIn', () => {
    const container = document.createElement('section');
    const onNavigate = jest.fn();
    container.append(home(onNavigate));
    const btnSignIn = container.querySelector('.btnSignIn');
    btnSignIn.click();
    expect(onNavigate).toHaveBeenCalledWith('/signin');
  });
});

describe('signup', () => {
  it('signup debe ser una función', () => {
    expect(typeof signup).toBe('function');
  });

  it('existe un botón de registrarse', () => {
    const container = document.createElement('section');
    container.append(signup());
    const btnRegister = container.querySelector('.btnRegister');
    expect(btnRegister).not.toBe(null);
  });

  test('registerBtn click event should call registerUserWithEmailAndPassword and navigate to /verification', async () => {
    const onNavigate = jest.fn();
    const registerUserWithEmailAndPassword = jest.fn().mockResolvedValue();
    const signupSection = signup(onNavigate, registerUserWithEmailAndPassword);
    const registerBtn = signupSection.querySelector('.btnRegister');
    const emailInput = signupSection.querySelector('#userEmail');
    const passwordInput = signupSection.querySelector('#userPassword');
    const confirmPasswordInput = signupSection.querySelector('#user-input');
    const emailError = signupSection.querySelector('#emailError');
    const passwordError = signupSection.querySelector('#passwordError');

    emailInput.value = 'test@test.com';
    passwordInput.value = 'password123';
    confirmPasswordInput.value = 'password123';

    // Click the register button
    expect(registerBtn).not.toBeNull();
    registerBtn.click();

    try {
      await registerUserWithEmailAndPassword(
        emailInput.value,
        passwordInput.value,
        confirmPasswordInput.value,
      );

      expect(onNavigate).toHaveBeenCalledWith('/verification');
    } catch (error) {
      throw new Error(`should not reject with valid parameters, got error: ${error}`);
    }

    expect(registerUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(registerUserWithEmailAndPassword).toHaveBeenCalledWith(
      emailInput.value,
      passwordInput.value,
      confirmPasswordInput.value,
    );
    expect(emailError.textContent).toBe('');
    expect(passwordError.textContent).toBe('');
  });

  it('debe navegar a Home al hacer click en el boton cerrar', () => {
    const onNavigate = jest.fn();
    const signupSection = signup(onNavigate);
    const closeBtn = signupSection.querySelector('.close-signUp');

    // Click the close button
    closeBtn.click();

    // Check that onNavigate was called with the correct argument
    expect(onNavigate).toHaveBeenCalledWith('/');
  });
  it('googleLogin debe ser llamado cuando se hace click en el botón de Google', () => {
    const onNavigate = jest.fn();
    const signupSection = signup(onNavigate);
    const btnGoogle = signupSection.querySelector('.btnGoogle');
    btnGoogle.click();
    expect(googleLogin).toHaveBeenCalledWith(onNavigate);
  });
});

describe('errorMessages', () => {
  it('displays the correct error message for auth/email-already-in-use', () => {
    const emailErrorMessage = document.createElement('span');
    const passwordErrorMessage = document.createElement('span');

    errorMessages('auth/email-already-in-use', emailErrorMessage, passwordErrorMessage);

    expect(emailErrorMessage.textContent).toBe('Este correo ya ha sido registrado');
    expect(passwordErrorMessage.textContent).toBe('');
  });

  it('displays the correct error message for auth/weak-password', () => {
    const emailErrorMessage = document.createElement('span');
    const passwordErrorMessage = document.createElement('span');

    errorMessages('auth/weak-password', emailErrorMessage, passwordErrorMessage);

    expect(emailErrorMessage.textContent).toBe('');
    expect(passwordErrorMessage.textContent).toBe('Escribe una contraseña más larga');
  });

  it('displays the correct error message for auth/invalid-email', () => {
    const emailErrorMessage = document.createElement('span');
    const passwordErrorMessage = document.createElement('span');

    errorMessages('auth/invalid-email', emailErrorMessage, passwordErrorMessage);

    expect(emailErrorMessage.textContent).toBe('Escribe un correo valido');
    expect(passwordErrorMessage.textContent).toBe('');
  });

  it('displays the correct error message for auth/missing-password', () => {
    const emailErrorMessage = document.createElement('span');
    const passwordErrorMessage = document.createElement('span');

    errorMessages('auth/missing-password', emailErrorMessage, passwordErrorMessage);

    expect(emailErrorMessage.textContent).toBe('');
    expect(passwordErrorMessage.textContent).toBe('Escribe una contraseña valida');
  });

  it('displays the correct error message for auth/user-not-found', () => {
    const emailErrorMessage = document.createElement('span');
    const passwordErrorMessage = document.createElement('span');

    errorMessages('auth/user-not-found', emailErrorMessage, passwordErrorMessage);

    expect(emailErrorMessage.textContent).toBe('Email no registrado');
    expect(passwordErrorMessage.textContent).toBe('');
  });

  it('displays the correct error message for auth/wrong-password', () => {
    const emailErrorMessage = document.createElement('span');
    const passwordErrorMessage = document.createElement('span');

    errorMessages('auth/wrong-password', emailErrorMessage, passwordErrorMessage);

    expect(emailErrorMessage.textContent).toBe('');
    expect(passwordErrorMessage.textContent).toBe('Contraseña incorrecta');
  });
});

it('googleLogin debe ser llamado cuando se hace click en el botón de Google', () => {
  const onNavigate = jest.fn();
  const signupSection = signup(onNavigate);
  const btnGoogle = signupSection.querySelector('.btnGoogle');
  btnGoogle.click();
  expect(googleLogin).toHaveBeenCalledWith(onNavigate);
});
