import { getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';
import { colRef } from '../lib/config/firebaseconfig.js';
import { posting } from '../lib/config/posts.js';

export const wall = () => {
  const wallSection = document.createElement('section');
  const header = document.createElement('header');
  const hamburguerArticle = document.createElement('article');
  const hamburguerImage = document.createElement('img');
  const logoContainerArticle = document.createElement('article');
  const wallLogoArticle = document.createElement('article');
  const logoImage = document.createElement('img');
  const logoSpanArticle = document.createElement('article');
  const petaSpan = document.createElement('span');
  const gramSpan = document.createElement('span');
  const profilePicArticle = document.createElement('article');
  const profilePicImage = document.createElement('img');
  const main = document.createElement('main');
  const postInputSection = document.createElement('section');
  const yourPostArticle = document.createElement('article');
  const form = document.createElement('form');
  const label = document.createElement('label');
  const br = document.createElement('br');
  const input = document.createElement('input');
  const containerbutton = document.createElement('article');
  const button = document.createElement('button');
  const pawnImage = document.createElement('img');
  const postsSection = document.createElement('section');
  const post1 = document.createElement('article');
  const post1Header = document.createElement('div');
  const userImg1 = document.createElement('img');
  const user1Name = document.createElement('p');
  const post1Content = document.createElement('div');
  const post1Text = document.createElement('p');
  const post1Bottom = document.createElement('div');
  const reactions1 = document.createElement('div');
  const dogReaction1 = document.createElement('img');
  const dogReactionCount1 = document.createElement('p');
  const catReaction1 = document.createElement('img');
  const catReactionCount1 = document.createElement('p');

  wallSection.classList.add('wall-section');
  hamburguerArticle.classList.add('hamburger');
  logoContainerArticle.classList.add('logo-container');
  wallLogoArticle.classList.add('wall-logo');
  logoSpanArticle.classList.add('logo-span');
  petaSpan.classList.add('peta');
  gramSpan.classList.add('gram');
  profilePicArticle.classList.add('profilePic');
  main.classList.add('container-wall');
  postInputSection.classList.add('post-input');
  yourPostArticle.classList.add('your-post');
  form.classList.add('form-yourpost');
  input.classList.add('your-postInput');
  containerbutton.classList.add('containerbutton');
  button.classList.add('btnyour-post');
  postsSection.classList.add('posts-section');
  post1.className = 'post';
  post1Header.className = 'post-header';
  userImg1.className = 'user-image';
  post1Content.className = 'post-content';
  post1Bottom.className = 'post-bottom';
  reactions1.className = 'reactions';
  hamburguerImage.src = 'images/hamburguer.png';
  hamburguerImage.alt = 'hamburguer';
  logoImage.src = 'images/logo.png';
  logoImage.alt = 'logo';
  logoImage.width = '83';
  logoImage.height = '77';
  petaSpan.innerText = 'Peta';
  gramSpan.innerText = 'gram';
  profilePicImage.src = 'images/profile-img.png';
  profilePicImage.alt = 'profile picture';
  label.htmlFor = 'your-postinput';
  label.innerText = '¡Hola de nuevo, usuarix!';
  input.type = 'text';
  input.id = 'your-postinput';
  input.name = 'your-postinput';
  input.placeholder = 'Escribe algo sobre tus mascotas...';
  pawnImage.src = 'images/pawn.png';
  pawnImage.alt = 'pawn';
  userImg1.src = 'images/user1.png';
  userImg1.alt = 'profile picture';
  user1Name.textContent = 'Fulanitx escribió:';
  post1Text.textContent = '¡Hola a todxs! Dale like si a tu mascota le gusta el pollito.';
  dogReaction1.src = 'images/dog.png';
  dogReaction1.alt = 'dog reaction';
  dogReactionCount1.textContent = '10';
  catReaction1.src = 'images/cat.png';
  catReaction1.alt = 'cat reaction';
  catReactionCount1.textContent = '18';

  hamburguerArticle.appendChild(hamburguerImage);
  header.appendChild(hamburguerArticle);
  wallLogoArticle.appendChild(logoImage);
  logoContainerArticle.appendChild(wallLogoArticle);
  logoSpanArticle.appendChild(petaSpan);
  logoSpanArticle.appendChild(gramSpan);
  logoContainerArticle.appendChild(logoSpanArticle);
  header.appendChild(logoContainerArticle);
  profilePicArticle.appendChild(profilePicImage);
  header.appendChild(profilePicArticle);
  button.appendChild(pawnImage);
  button.appendChild(document.createTextNode('Publicar'));
  form.appendChild(label);
  form.appendChild(br);
  form.appendChild(input);
  form.appendChild(br.cloneNode());
  containerbutton.appendChild(button);
  form.appendChild(containerbutton);
  yourPostArticle.appendChild(form);
  postInputSection.appendChild(yourPostArticle);
  main.appendChild(postInputSection);
  post1Header.appendChild(userImg1);
  post1Header.appendChild(user1Name);
  post1Content.appendChild(post1Text);
  reactions1.appendChild(dogReaction1);
  reactions1.appendChild(dogReactionCount1);
  reactions1.appendChild(catReaction1);
  reactions1.appendChild(catReactionCount1);

  const commentBtn1 = document.createElement('button');
  commentBtn1.className = 'btnComment';
  commentBtn1.type = 'button';
  const commentBtnIcon1 = document.createElement('img');
  commentBtnIcon1.src = 'images/post-pawn.png';
  const commentBtnText1 = document.createTextNode('Comentar');
  commentBtn1.appendChild(commentBtnIcon1);
  commentBtn1.appendChild(commentBtnText1);
  post1Bottom.appendChild(reactions1);
  post1Bottom.appendChild(commentBtn1);
  post1.appendChild(post1Header);
  post1.appendChild(post1Content);
  post1.appendChild(post1Bottom);
  const post2 = document.createElement('article');
  post2.className = 'post';
  const post2Header = document.createElement('div');
  post2Header.className = 'post-header';
  const userImg2 = document.createElement('img');
  userImg2.className = 'user-image';
  userImg2.src = 'images/user2.png';
  userImg2.alt = 'profile picture';
  const user2Name = document.createElement('p');
  user2Name.textContent = 'Fulanitx escribió:';
  post2Header.appendChild(userImg2);
  post2Header.appendChild(user2Name);
  const post2Content = document.createElement('div');
  post2Content.className = 'post-content';
  const post2Text = document.createElement('p');
  post2Text.textContent = 'Les recomiendo estos lugares pet-friendly: Patazonia, TacoFriends y Cinemalitos.';
  post2Content.appendChild(post2Text);
  const post2Bottom = document.createElement('div');
  post2Bottom.className = 'post-bottom';
  const reactions2 = document.createElement('div');
  reactions2.className = 'reactions';
  const dogReaction2 = document.createElement('img');
  dogReaction2.src = 'images/dog.png';
  dogReaction2.alt = 'dog reaction';
  const dogReactionCount2 = document.createElement('p');
  dogReactionCount2.textContent = '2';
  const catReaction2 = document.createElement('img');
  catReaction2.src = 'images/cat.png';
  catReaction2.alt = 'cat reaction';
  const catReactionCount2 = document.createElement('p');
  catReactionCount2.textContent = '18';
  reactions2.appendChild(dogReaction2);
  reactions2.appendChild(dogReactionCount2);
  reactions2.appendChild(catReaction2);
  reactions2.appendChild(catReactionCount2);
  const commentBtn2 = document.createElement('button');
  commentBtn2.className = 'btnComment';
  commentBtn2.type = 'button';
  const commentBtnIcon2 = document.createElement('img');
  commentBtnIcon2.src = 'images/post-pawn.png';
  const commentBtnText2 = document.createTextNode('Comentar');
  commentBtn2.appendChild(commentBtnIcon2);
  commentBtn2.appendChild(commentBtnText2);
  post2Bottom.appendChild(reactions2);
  post2Bottom.appendChild(commentBtn2);
  post2.appendChild(post2Header);
  post2.appendChild(post2Content);
  post2.appendChild(post2Bottom);
  postsSection.append(post1, post2);
  main.appendChild(postsSection);
  wallSection.append(header, main);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const postText = input.value.trim();
    if (postText !== '') {
      posting(input, form);
    }
  });

  const q = query(colRef, orderBy('timestamp', 'desc'));
  getDocs(q)
    .then((snapshot) => {
      const postsArr = [];
      snapshot.docs.forEach((doc) => {
        postsArr.push({ ...doc.data(), id: doc.id });
      });

      // Create HTML elements for each post
      postsArr.forEach((pos) => {
        const post = document.createElement('article');
        post.className = 'post';

        const postHeader = document.createElement('div');
        postHeader.className = 'post-header';

        const userImage = document.createElement('img');
        userImage.className = 'user-image';
        userImage.src = 'images/user1.png';
        userImage.alt = 'profile picture';
        postHeader.appendChild(userImage);

        const userNameElem = document.createElement('p');
        userNameElem.textContent = `${pos.userid} escribió: `;
        postHeader.appendChild(userNameElem);

        const postContent = document.createElement('div');
        postContent.className = 'post-content';

        const postText = document.createElement('p');
        postContent.appendChild(postText);

        const postBottom = document.createElement('div');
        postBottom.className = 'post-bottom';

        const reactions = document.createElement('div');
        reactions.className = 'reactions';

        const dogReaction = document.createElement('img');
        dogReaction.src = 'images/dog.png';
        dogReaction.alt = 'dog reaction';
        reactions.appendChild(dogReaction);

        // const dogReactionCount = document.createElement('p');
        // dogReactionCount.textContent = dogCount.toString();
        // reactions.appendChild(dogReactionCount);

        const catReaction = document.createElement('img');
        catReaction.src = 'images/cat.png';
        catReaction.alt = 'cat reaction';
        reactions.appendChild(catReaction);

        // const catReactionCount = document.createElement('p');
        // catReactionCount.textContent = catCount.toString();
        // reactions.appendChild(catReactionCount);

        const commentBtn = document.createElement('button');
        commentBtn.className = 'btnComment';
        commentBtn.type = 'button';

        const commentBtnIcon = document.createElement('img');
        commentBtnIcon.src = 'images/post-pawn.png';
        commentBtnIcon.alt = 'comment';
        commentBtn.appendChild(commentBtnIcon);

        postBottom.appendChild(reactions);
        postBottom.appendChild(commentBtn);

        post.appendChild(postHeader);
        postText.textContent = pos.text;
        post.appendChild(postContent);
        post.appendChild(postBottom);

        postsSection.appendChild(post);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  return wallSection;
};
