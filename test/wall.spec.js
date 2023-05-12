/**
 * @jest-environment jsdom
 */
import { wall } from '../src/templates/wall';
import { signOutUser } from '../src/lib/config/auth';
import { posting, postData } from '../src/lib/config/posts';

jest.mock('../src/lib/config/auth', () => ({
  signOutUser: jest.fn(() => Promise.resolve()),
  getAuth: () => ({
    currentUser: {
      displayName: 'John Doe',
    },
  }),
}));
jest.mock('../src/lib/config/posts', () => ({
  posting: jest.fn(),
  postData: jest.fn(),
}));

jest.mock('../src/lib/config/firebaseconfig', () => ({
  auth: jest.fn(),
}));

describe('wall', () => {
  let wallSection;

  beforeEach(() => {
    wallSection = wall();
  });

  afterEach(jest.clearAllMocks);

  it('deberia de crear los elementos nesarios para el muro', () => {
    expect(wallSection).toBeTruthy();
    expect(wallSection.querySelector('header')).toBeTruthy();
    expect(wallSection.querySelector('.hamburger')).toBeTruthy();
    expect(wallSection.querySelector('.logo-container')).toBeTruthy();
    expect(wallSection.querySelector('.profilePic')).toBeTruthy();
    expect(wallSection.querySelector('main')).toBeTruthy();
    expect(wallSection.querySelector('.post-input')).toBeTruthy();
    expect(wallSection.querySelector('.posts-section')).toBeTruthy();
  });

  it('deberia de existir un boton de publicar', () => {
    /*  const container = document.createElement('section');
    container.append(wall()); */
    const btnPublish = wallSection.querySelector('.btnyour-post');
    expect(btnPublish).toBeTruthy();
  });

  it('deberia de existir un boton de cerrar sesión', () => {
    const container = document.createElement('section');
    container.append(wall());
    const btnClose = container.querySelector('.btn-logout');
    expect(btnClose).not.toBe(null);
  });

  it('debe navegar a Home al hacer click en el boton cerrar sesión', async () => {
    const onNavigate = jest.fn();
    const container = document.createElement('section');
    container.append(wall(onNavigate));

    const closeBtn = container.querySelector('.btn-logout');
    expect(closeBtn).not.toBe(null);
    // Click the close button
    closeBtn.click();
    await signOutUser.mockImplementation(() => Promise.resolve());
    expect(onNavigate).toHaveBeenCalledWith('/');
  });

  test('form submission should trigger posting function if input value is not empty', () => {
    // Create test input and form elements
    const container = document.createElement('section');
    container.append(wall());
    const form = container.querySelector('.form-yourpost');
    const input = container.querySelector('.your-postInput');
    input.value = 'Some post text';

    // Simulate form submission
    form.dispatchEvent(new Event('submit', { bubbles: true }));

    // Ensure posting function is called with the specified arguments
    expect(posting).toHaveBeenCalledWith(input, form);
  });

  it('deberia de renderizar la pantalla wall correctamente', () => {
    const container = document.createElement('section');
    container.append(wall());
    expect(container.innerHTML).toMatchSnapshot();
  });
  test('El evento de clic debe agregar o eliminar la clase "active" en sectionMenu', () => {
    const hamburguerArticle = wallSection.querySelector('.hamburger');
    const sectionMenu = wallSection.querySelector('.section-menu');

    hamburguerArticle.click();
    expect(sectionMenu.classList.contains('active')).toBe(true);

    hamburguerArticle.click();
    expect(sectionMenu.classList.contains('active')).toBe(false);
  });
  test('El evento de clic para el boton close debe agregar o eliminar la clase "active" en sectionMenu', () => {
    const btnCloseMenu = wallSection.querySelector('.btn-close-menu');
    const sectionMenu = wallSection.querySelector('.section-menu');

    btnCloseMenu.click();
    expect(sectionMenu.classList.contains('active')).toBe(true);

    btnCloseMenu.click();
    expect(sectionMenu.classList.contains('active')).toBe(false);
  });
  it('should render posts correctly', () => {
    const mockQuerySnapshot = {
      forEach: jest.fn((callback) => {
        const mockPostData = {
          userid: 'user1',
          text: 'Some post text',
          likes: [],
          likescat: [],
        };
        const mockPos = {
          id: 'post1',
          data: () => mockPostData,
        };
        callback(mockPos);
      }),
    };

    postData.mockImplementationOnce((callback) => {
      callback(mockQuerySnapshot);
    });
    wall();
  });
});
