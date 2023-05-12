import {
  posting,
  deletePost,
  editPost,
  like,
  dislike,
  likecat,
  dislikecat,
  postData,
} from '../lib/config/posts.js';
import { signOutUser } from '../lib/config/auth.js';
import { auth } from '../lib/config/firebaseconfig.js';

export const wall = (onNavigate) => {
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

  const sectionMenu = document.createElement('section');
  const btnCloseMenu = document.createElement('button');

  const sectionPerfilMenu = document.createElement('section');
  const btnPerfilMenu = document.createElement('button');
  const imgPerfilMenu = document.createElement('img');

  const sectionMuroMenu = document.createElement('section');
  const btnMuroMenu = document.createElement('button');
  const imgMuroMenu = document.createElement('img');

  const sectionAmigxsMenu = document.createElement('section');
  const imgAmigxsMenu = document.createElement('img');
  const btnAmigxsMenu = document.createElement('button');

  const sectionLogout = document.createElement('section');
  const btnLogout = document.createElement('button');
  const imgLogout = document.createElement('img');

  const sectionBtnMenu = document.createElement('section');

  sectionBtnMenu.classList.add('section-btn-menu');
  sectionLogout.classList.add('section-logout');
  btnLogout.classList.add('btn-logout');
  btnLogout.textContent = 'Cerrar sesión';
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

  sectionMenu.classList.add('section-menu');
  btnCloseMenu.classList.add('btn-close-menu');
  sectionPerfilMenu.classList.add('section-perfil-menu');
  imgPerfilMenu.classList.add('img-perfil-menu');
  imgMuroMenu.classList.add('img-muro-menu');
  imgAmigxsMenu.classList.add('img-amigxs-menu');
  btnPerfilMenu.classList.add('btn-menu');
  btnMuroMenu.classList.add('btn-menu');
  btnAmigxsMenu.classList.add('btn-menu');
  imgLogout.classList.add('img-signout');

  imgPerfilMenu.src = 'images/cat-porfile-menu.png';
  imgMuroMenu.src = 'images/cat-muro-menu.png';
  imgAmigxsMenu.src = 'images/amigxs-menu.png';
  imgLogout.src = 'images/signout-dog.png';

  imgPerfilMenu.width = '60';
  imgPerfilMenu.height = '60';
  imgMuroMenu.width = '60';
  imgMuroMenu.height = '60';
  imgAmigxsMenu.width = '60';
  imgAmigxsMenu.height = '60';
  imgLogout.width = '60';
  imgLogout.height = '60';

  btnCloseMenu.innerHTML = '&times;';
  btnPerfilMenu.innerHTML = 'Perfil';
  btnMuroMenu.innerHTML = 'Muro';
  btnAmigxsMenu.innerHTML = 'Amigxs';

  btnPerfilMenu.appendChild(imgPerfilMenu);
  btnMuroMenu.appendChild(imgMuroMenu);
  btnAmigxsMenu.appendChild(imgAmigxsMenu);
  btnLogout.appendChild(imgLogout);

  sectionPerfilMenu.append(btnPerfilMenu);
  sectionMuroMenu.append(btnMuroMenu);
  sectionAmigxsMenu.append(btnAmigxsMenu);
  sectionLogout.append(btnLogout);

  sectionBtnMenu.append(
    sectionPerfilMenu,
    sectionMuroMenu,
    sectionAmigxsMenu,
  );

  sectionMenu.append(
    btnCloseMenu,
    sectionBtnMenu,
    sectionLogout,
  );

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

  main.appendChild(postsSection);
  wallSection.append(sectionMenu, header, main);

  hamburguerArticle.addEventListener('click', () => {
    sectionMenu.classList.toggle('active');
  });

  btnCloseMenu.addEventListener('click', () => {
    sectionMenu.classList.toggle('active');
  });

  // create confirmation modal
  const confirmationModal = document.createElement('div');
  confirmationModal.className = 'confirmationModal';
  confirmationModal.style.display = 'none';

  const confirmationMessage = document.createElement('p');
  confirmationMessage.textContent = '¿Segurx que deseas eliminar esta publicación?';
  const confirmDog = document.createElement('img');
  confirmDog.src = 'images/dogConfirm.png';

  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'confirmBtn';
  confirmBtn.textContent = 'Eliminar';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'cancelBtn';
  cancelBtn.textContent = 'Cancelar';

  confirmationModal.appendChild(confirmationMessage);
  confirmationModal.appendChild(confirmDog);
  confirmationModal.appendChild(confirmBtn);
  confirmationModal.appendChild(cancelBtn);
  wallSection.appendChild(confirmationModal);

  const editModal = document.createElement('div');
  editModal.className = 'editModal';
  editModal.style.display = 'none';
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'editInput';

  const confirmEditBtn = document.createElement('button');
  confirmEditBtn.className = 'confirmBtn';
  confirmEditBtn.textContent = 'Editar';

  const cancelEditBtn = document.createElement('button');
  cancelEditBtn.className = 'cancelBtn';
  cancelEditBtn.textContent = 'Cancelar';

  editModal.appendChild(editInput);
  editModal.appendChild(confirmEditBtn);
  editModal.appendChild(cancelEditBtn);
  wallSection.appendChild(editModal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const postText = input.value.trim();
    if (postText !== '') {
      posting(input, form);
    }
  });

  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    signOutUser()
      .then(() => {
        // Email verification sent successfully
        onNavigate('/');
      });
  });

  postData((querySnapshot) => {
    postsSection.innerHTML = '';
    querySnapshot.forEach((pos) => {
      const post = document.createElement('article');
      post.className = 'post';
      console.log('HOLA');
      const postHeader = document.createElement('div');
      postHeader.className = 'post-header';

      const userImage = document.createElement('img');
      userImage.className = 'user-image';
      userImage.src = 'images/user1.png';
      userImage.alt = 'profile picture';
      postHeader.appendChild(userImage);

      const userNameElem = document.createElement('p');
      userNameElem.textContent = `${pos.data().userid} escribió: `;
      postHeader.appendChild(userNameElem);

      const dotContainer = document.createElement('article');
      const moreOptionsimg = document.createElement('img');
      const frameOptions = document.createElement('div');

      frameOptions.className = 'frame-options';
      moreOptionsimg.src = 'images/dot-menu.png';
      moreOptionsimg.alt = 'more-options';
      moreOptionsimg.className = 'more_options-img';
      dotContainer.className = 'dot-container';
      dotContainer.append(moreOptionsimg, frameOptions);

      moreOptionsimg.addEventListener('click', () => {
        frameOptions.classList.toggle('active');
      });

      const editBtn = document.createElement('button');
      editBtn.className = 'option1';
      editBtn.textContent = 'Editar';
      editBtn.addEventListener('click', () => {
        // Mostrar modal de edición
        editInput.value = pos.data().text;
        editModal.style.display = 'block';
        confirmEditBtn.addEventListener('click', () => {
          editPost(pos.id, editInput.value);
          // Esconder el modal de cofirmación
          editModal.style.display = 'none';
          // Remover el event listener para que no se llame editPost() de nuevo
        }, {
          // This will invoke the event once and de-register it afterward
          once: true,
        });

        // Esconder el modal de confirmación si el usuario da click en cancelar
        cancelEditBtn.addEventListener('click', () => {
          editModal.style.display = 'none';
        });
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.className = 'option2';
      deleteButton.addEventListener('click', () => {
        // Mostrar modal mensaje de confirmación

        confirmationModal.style.display = 'block';

        confirmBtn.addEventListener('click', () => {
          deletePost(pos.id);
          // Esconder el modal de cofirmación
          confirmationModal.style.display = 'none';
        });

        // Esconder el modal de confirmación si el usuario da click en cancelar
        cancelBtn.addEventListener('click', () => {
          confirmationModal.style.display = 'none';
        });
      });
      if (pos.data().userid === auth.currentUser.displayName) {
        frameOptions.appendChild(editBtn);
        frameOptions.appendChild(deleteButton);
        postHeader.appendChild(dotContainer);
      }

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

      const dogReactionCount = document.createElement('div');
      dogReactionCount.setAttribute('id', 'divlike');
      dogReactionCount.textContent = pos.data().likes.length;

      const catReactionCount = document.createElement('div');
      catReactionCount.setAttribute('id', 'divlikecat');
      catReactionCount.textContent = pos.data().likescat.length;

      reactions.appendChild(dogReactionCount);

      const catReaction = document.createElement('img');
      catReaction.src = 'images/cat.png';
      catReaction.alt = 'cat reaction';
      reactions.appendChild(catReaction);
      reactions.appendChild(catReactionCount);

      dogReaction.addEventListener('click', () => {
        const user = auth.currentUser.uid;
        const likes = pos.data().likes;
        // si el usuario da like los suma
        if (!likes.includes(user)) {
          like(pos.id);
        } else {
          // dislike resta el me gusta
          dislike(pos.id);
        }
      });

      catReaction.addEventListener('click', () => {
        const user = auth.currentUser.uid;
        const likes = pos.data().likescat;
        // si el usuario da like los suma
        if (!likes.includes(user)) {
          likecat(pos.id);
        } else {
          // dislike resta el me gusta
          dislikecat(pos.id);
        }
      });
      const commentBtn = document.createElement('button');
      commentBtn.className = 'btnComment';
      commentBtn.type = 'button';

      const commentBtnIcon = document.createElement('img');
      commentBtnIcon.src = 'images/post-pawn.png';
      commentBtnIcon.alt = 'comment';
      commentBtn.appendChild(commentBtnIcon);
      const btnText = document.createTextNode('Comentar');
      commentBtn.appendChild(btnText);
      postBottom.appendChild(reactions);
      postBottom.appendChild(commentBtn);

      post.appendChild(postHeader);
      postText.textContent = pos.data().text;
      post.appendChild(postContent);
      post.appendChild(postBottom);

      postsSection.appendChild(post);
    });
  });
  return wallSection;
};
