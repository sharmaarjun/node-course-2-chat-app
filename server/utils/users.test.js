const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Arjun',
            room: 'Node course'
        }, {
            id: '2',
            name: 'Mafia',
            room: 'React course'
        }, {
            id: '3',
            name: 'Godfather',
            room: 'Node course'
        }];
    });


    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Arjun',
            room: 'Office friends'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);                // first users is from users.test  and second users is array in users.js

    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('should return names for Node course ', () => {
        var userList = users.getUserList('Node course');

        expect(userList).toEqual(['Arjun','Godfather']);
    });

    it('should return names for React course ', () => {
        var userList = users.getUserList('React course');

        expect(userList).toEqual(['Mafia']);
    });
});