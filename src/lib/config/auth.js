/* eslint-disable no-unused-vars */
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebaseconfig';

function errorMessages(errorCode, emailError, passwordError) {
  if (errorCode === 'auth/email-already-in-use') {
    emailError.textContent = 'Este correo ya ha sido registrado';
  } else if (errorCode === 'auth/weak-password') {
    passwordError.textContent = 'Escribe una contraseña más larga';
  } else if (errorCode === 'auth/invalid-email') {
    emailError.textContent = 'Escribe un correo valido';
  } else if (errorCode === 'auth/missing-password') {
    passwordError.textContent = 'Escribe una contraseña valida';
  } else if (errorCode === 'auth/user-not-found') {
    emailError.textContent = 'Email no registrado';
  } else if (errorCode === 'auth/wrong-password') {
    passwordError.textContent = 'Contraseña incorrecta';
  }
}

export function authFunction(
  userEmail,
  userPassword,
  onNavigate,
  emailError,
  passwordError,
  input,
) {
  const email = userEmail.value;
  const password = userPassword.value;
  emailError.textContent = '';
  passwordError.textContent = '';

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // eslint-disable-next-line no-unused-vars
      const user = userCredential.user;
      const username = input.value;
      sendEmailVerification(user);
      updateProfile(auth.currentUser, {
        displayName: username, // Aquí se especifica el valor para la propiedad displayName
      });
    })
    .then(() => {
      // Email verification sent successfully
      onNavigate('/verification');
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      errorMessages(errorCode, emailError, passwordError);
    });
}

export const login = (onNavigate, userEmail, userPassword, emailError, passwordError) => {
  const email = userEmail.value;
  const password = userPassword.value;
  emailError.textContent = '';
  passwordError.textContent = '';
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      onNavigate('/wall');
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      errorMessages(errorCode, emailError, passwordError);
    });
};

const provider = new GoogleAuthProvider();
export const googleLogin = (onNavigate) => {
  console.log('ENTRO');
  signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      onNavigate('/wall');
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
};
