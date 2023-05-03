/**
 * @jest-environment jsdom
 */

import { home } from '../src/templates/home';
import { signup } from '../src/templates/signUp';
import { authFunction } from '../src/lib/config/auth';

jest.mock('../src/lib/config/auth', () => ({
  authFunction: jest.fn(),
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

  it('debe navegar a SignUp al hacer click en el boton de ingresar', () => {
    const onNavigate = jest.fn();
    const signupSection = signup(onNavigate);
    const signInLink = signupSection.querySelector('#link-signUp');
    signInLink.click();
    expect(onNavigate).toHaveBeenCalledWith('/signin');
  });

  // eslint-disable-next-line jest/no-focused-tests
  it('authFunction debe ser llamado cuando se hace click en el botón de registrarse', () => {
    const onNavigate = jest.fn();
    const signupSection = signup(onNavigate);
    const btnRegister = signupSection.querySelector('.btnRegister');
    const emailInput = signupSection.querySelector('#userEmail');
    const passwordInput = signupSection.querySelector('#userPassword');
    const emailError = signupSection.querySelector('#errorEmailMessage');
    const passwordError = signupSection.querySelector('#errorPassMessage');
    const userInput = signupSection.querySelector('input');

    // Click the register button
    btnRegister.click();

    // Check that authFunction was called with the correct arguments
    expect(authFunction).toHaveBeenCalledWith(
      emailInput,
      passwordInput,
      onNavigate,
      emailError,
      passwordError,
      userInput,
    );
  });
});
