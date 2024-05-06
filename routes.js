import express from 'express';
export const router = express.Router();
import { createUser, deleteUser, getUser, getUsers, updateUser } from './controllers.js';

// router.use((req, res, next) => {
//     console.log("Going through one middleware");
//     next();
// });
router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
