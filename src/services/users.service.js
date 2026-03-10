import { mockUsers } from '../mocks/data/users';
import { mockDelay } from '../mocks/handlers';

class UsersService {
  async getAll() {
    await mockDelay();
    return mockUsers;
  }

  async getById(id) {
    await mockDelay();
    return mockUsers.find(u => u.id === parseInt(id));
  }

  async create(data) {
    await mockDelay();
    const newUser = { ...data, id: mockUsers.length + 1 };
    mockUsers.push(newUser);
    return newUser;
  }

  async update(id, data) {
    await mockDelay();
    const index = mockUsers.findIndex(u => u.id === parseInt(id));
    if (index === -1) throw new Error('User not found');
    mockUsers[index] = { ...mockUsers[index], ...data };
    return mockUsers[index];
  }

  async delete(id) {
    await mockDelay();
    const index = mockUsers.findIndex(u => u.id === parseInt(id));
    if (index !== -1) mockUsers.splice(index, 1);
    return true;
  }
}

export const usersService = new UsersService();
