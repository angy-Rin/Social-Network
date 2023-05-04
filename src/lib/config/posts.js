import { addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { colRef, auth } from './firebaseconfig.js';

getDocs(colRef)
  .then((snapshot) => {
    const posts = [];
    snapshot.docs.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    console.log(posts);
  })
  .catch((err) => {
    console.log(err.message);
  });

export function posting(input, form) {
  const userId = auth.currentUser.displayName;
  addDoc(colRef, {
    text: input.value,
    timestamp: serverTimestamp(),
    userid: userId,
  })
    .then(() => {
      form.reset();
    });
  console.log(getDocs(colRef));
}
