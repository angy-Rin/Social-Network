import {
  addDoc, getDocs, serverTimestamp, deleteDoc, doc,
} from 'firebase/firestore';
import { colRef, auth } from './firebaseconfig.js';

getDocs(colRef)
  .then((snapshot) => {
    const posts = [];
    snapshot.docs.forEach((docu) => {
      posts.push({ ...docu.data(), id: docu.id });
    });
    console.log(posts);
  })
  .catch((err) => {
    console.log(err.message);
  });

export function posting(input, form) {
  const userId = auth.currentUser.displayName;
  return addDoc(colRef, {
    text: input.value,
    timestamp: serverTimestamp(),
    userid: userId,
  })
    .then(() => {
      form.reset();
    });
}

export function deletePost(postId) {
  const postDocRef = doc(colRef, postId);

  return deleteDoc(postDocRef)
    .then(() => {
      console.log(`Post ${postId} deleted successfully`);
    })
    .catch((err) => {
      console.log(`Error deleting post ${postId}: ${err.message}`);
    });
}
