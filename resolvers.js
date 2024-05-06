import {
    getUsers,
    getUser,
    createUser
} from './controllers.graphql.js';

export const resolvers = {
    hello() {
        return 'hello world';
    },
    users: getUsers,
    user: (args) => {
        return getUser(args.id);
    },
    addUser: ({user}) => {
        return createUser(user.name, user.email, user.username, user.password);
    }
};
