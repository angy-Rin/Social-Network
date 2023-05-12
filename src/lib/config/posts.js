import {
  addDoc,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  orderBy, query, onSnapshot,
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
    likes: [],
    likescat: [],
  })
    .then(() => {
      form.reset();
    });
}
// Una vez que se produzcan cambios en los datos, la función callback se invocará y se pasará como
// argumento el resultado de la consulta modificada.
const orderedQuery = query(colRef, orderBy('timestamp', 'desc'));
export const postData = (callback) => onSnapshot(orderedQuery, callback);

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

export function editPost(postId, newPostText) {
  const postDocRef = doc(colRef, postId);
  const newTimestamp = serverTimestamp();

  return updateDoc(postDocRef, {
    text: newPostText,
    timestamp: newTimestamp,
  })
    .then(() => {
      console.log(`Post ${postId} edited successfully`);
    })
    .catch((err) => {
      console.log(`Error editing post ${postId}: ${err.message}`);
    });
}

export const like = (postId) => {
  const postDocRef = doc(colRef, postId);
  return updateDoc(postDocRef, { likes: arrayUnion(auth.currentUser.uid) });
};

export const dislike = (postId) => {
  const postDocRef = doc(colRef, postId);
  return updateDoc(postDocRef, { likes: arrayRemove(auth.currentUser.uid) });
};

export const likecat = (postId) => {
  const postDocRef = doc(colRef, postId);
  return updateDoc(postDocRef, { likescat: arrayUnion(auth.currentUser.uid) });
};

export const dislikecat = (postId) => {
  const postDocRef = doc(colRef, postId);
  return updateDoc(postDocRef, { likescat: arrayRemove(auth.currentUser.uid) });
};
