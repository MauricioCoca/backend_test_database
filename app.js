import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes.js';
import { createUserTable, seedUserTable } from './utilities.js';
// import {connection} from './database.js';
import mysql from 'mysql2/promise';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema.js';
import { resolvers } from './resolvers.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
    })
);
export const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'argoniur00',
    database: 'backend',
});
// connection.connect((error) => {
//     if (error) {
//         console.error("Connection problem " + error.stack);
//         return;
//     }
//     console.log("Connection stablished");
// });

createUserTable(connection);
// seedUserTable(connection);

// import { getUser } from './controllers.graphql.js';
// (async () => {
//     try{
//         const user = await getUser(3);
//         console.log(user);
//     }catch(e){
//         console.log(e);
//     }
// })();
