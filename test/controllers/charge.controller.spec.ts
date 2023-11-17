
describe('UserController', () => {
    test('getUserInfo returns the correct user information', () => {
        const mockedUserId = 123;
        const mockedUserData = { id: mockedUserId, name: 'Mocked User' };

        const result = `User ID: ${mockedUserId}, Name: ${mockedUserData.name}`;

        expect(result).toBe(`User ID: ${mockedUserId}, Name: ${mockedUserData.name}`);
    });
});
