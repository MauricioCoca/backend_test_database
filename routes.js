import express from 'express';
export const router = express.Router();
import { connection } from './app.js';

// router.use((req, res, next) => {
//     console.log("Going through one middleware");
//     next();
// });
router.get('/users', (req, res) => {
    console.log("hola mundo");
    let query = 'SELECT * FROM `user`;';
    connection.query(query, (error, results, field) => {
        console.log(results);
        console.log(field);
    });

    res.json({"message":"get all users"});
});
router.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.json(users);
});
router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    if (!user) {
        res.status(404).send('<h1>User not found</h1>');
        return;
    }
    res.json(user);
});
router.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const newUserInfo = req.body;
    const requestedUser = users.find((user) => user.id == id);
    if (!requestedUser) {
        res.status(404).send('<h1>User not found</h1>');
        return;
    }
    for (let [key, value] of Object.entries(newUserInfo)) {
        requestedUser[key] = value;
    }
    res.json(requestedUser);
});
router.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const requestedUserIndex = users.findIndex((user) => user.id == id);
    if (requestedUserIndex == -1) {
        res.status(404).send('<h1>User not found</h1>');
        return;
    }
    let userDeleted = users.splice(requestedUserIndex, 1);
    res.json(userDeleted);
});
