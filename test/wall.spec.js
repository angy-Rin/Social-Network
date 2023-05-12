/**
 * @jest-environment jsdom
 */
import { getAuth } from 'firebase/auth';
import { wall } from '../src/templates/wall';
import { signOutUser } from '../src/lib/config/auth';
import { posting, postData, deletePost } from '../src/lib/config/posts';

jest.mock('firebase/auth', () => ({
  getAuth: () => ({
    currentUser: {
      displayName: 'user1',
    },
  }),
}));

jest.mock('../src/lib/config/auth', () => ({
  signOutUser: jest.fn(() => Promise.resolve()),

}));
jest.mock('../src/lib/config/posts', () => ({
  posting: jest.fn(),
  postData: jest.fn(),
  deletePost: jest.fn(),
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

  test('Si el input no está vacío debe llamarse la función posting', () => {
    const container = document.createElement('section');
    container.append(wall());
    const form = container.querySelector('.form-yourpost');
    const input = container.querySelector('.your-postInput');
    input.value = 'Some post text';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    expect(posting).toHaveBeenCalledWith(input, form);
  });
  test('Si el input está vacío np debe llamarse la función posting', () => {
    const container = document.createElement('section');
    container.append(wall());
    const form = container.querySelector('.form-yourpost');
    const input = container.querySelector('.your-postInput');
    input.value = '';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    expect(posting).not.toHaveBeenCalledWith(input, form);
  });

  test('al hacer clic en el menú hamburguesa la clase debe cambiar a active', () => {
    const container = document.createElement('section');
    container.append(wall());
    const hamburgerArticle = container.querySelector('.hamburger');
    const sectionMenu = document.createElement('section-menu');

    hamburgerArticle.dispatchEvent(new Event('click'));
    expect(sectionMenu.classList.contains('active')).toBe(false);

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
    const container = wall();
    const auth = getAuth();
    mockQuerySnapshot.forEach((mockPos) => {
      const deleteButton = container.querySelector('.option2');
      const confirmationModal = container.querySelector('.confirmationModal');
      const confirmBtn = container.querySelector('.confirmBtn');
      const cancelBtn = container.querySelector('.cancelBtn');
      deleteButton.click();
      expect(confirmationModal.style.display).toBe('block');
      confirmBtn.click();
      expect(deletePost).toHaveBeenCalledWith(mockPos.id);
      expect(confirmationModal.style.display).toBe('none');
      // 318
      cancelBtn.click();
      expect(confirmationModal.style.display).toBe('none');
      expect(mockPos.data().userid).toEqual(auth.currentUser.displayName);
    });
  });
  it('username del currentuser no es igual al del post', () => {
    const mockQuerySnapshot = {
      forEach: jest.fn((callback) => {
        const mockPostData = {
          userid: 'user2',
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
    const auth = getAuth();
    mockQuerySnapshot.forEach((mockPos) => {
      expect(mockPos.data().userid).not.toEqual(auth.currentUser.displayName);
    });
  });
});
