import { buildSchema } from 'graphql';
import { resolvers } from './resolvers.js';

export const schema = buildSchema(`
    type User {
        id: Int
        name: String
        email: String
        username: String
        password: String
    }

    type Query {
        hello: String
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        addUser(user: UserInput): String
        
    }

    input UserInput{
        name: String
        email: String
        username: String
        password: String
    }
`);
