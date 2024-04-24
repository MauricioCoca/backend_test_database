import express from 'express';
export const router = express.Router();
import { connection } from './app.js';

// router.use((req, res, next) => {
//     console.log("Going through one middleware");
//     next();
// });
router.get('/users', (req, res) => {
    let query = 'SELECT * FROM `user`;';
    connection.query(
        query,
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: 'Error interno del servidor' });
                return;
            }
            res.json({
                "users": results,
                "endpoints": {
                    "get users": "GET /users",
                    "get specific user": "GET /users/{id}",
                    "create user": "POST /users",
                    "update user": "PUT /users/{id}",
                    "delete user": "DELETE /users/{id}"
                }
            });
        });
});
router.post('/users', (req, res) => {
    console.log(req.body);
    let { name, email, username, password } = req.body;
    //falta verificar que cada campo not null y unique sean controlados
    let query = "INSERT INTO `user`(name, email, username, password) VALUES" +
        "(?, ?, ?, ?);";
    connection.execute(
        query,
        [name, email, username, password],
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: 'Error interno del servidor' });
                return;
            }
            res.json({
                "message": "user inserted succesfully",
                "endpoints": {
                    "get users": "GET /users",
                    "get specific user": "GET /users/{id}",
                    "create user": "POST /users",
                    "update user": "PUT /users/{id}",
                    "delete user": "DELETE /users/{id}"
                }
            });
        }
    );
});
router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let query = "SELECT * FROM `user` WHERE `user`.id = ?;";
    connection.execute(
        query,
        [id],
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: 'Error interno del servidor' });
                return;
            }
            if (results.length == 0) {
                res.status(404).json({
                    "message": "user not found"
                })
            }
            else {
                res.json({
                    "user": results[0],
                    "endpoints": {
                        "get users": "GET /users",
                        "get specific user": "GET /users/{id}",
                        "create user": "POST /users",
                        "update user": "PUT /users/{id}",
                        "delete user": "DELETE /users/{id}"
                    }
                })
            }
        }
    )
});
router.put('/users/:id', (req, res) => {
    const id = req.params.id;
    let { name, email, username, password } = req.body;
    let query = 'SELECT id FROM `user` WHERE `user`.id = ?;';
    let update = 'UPDATE `user` SET name=?, email=?, username=?, password=? where id=?;';
    connection.execute(
        query,
        [id],
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: 'Error interno del servidor' });
                return;
            }
            if (results.length == 0) {
                res.status(404).json({
                    "message": "user not found"
                })
            }
            let requestedUser = results[0];
            requestedUser[name] = name;
            requestedUser[email] = email;
            requestedUser[username] = email;
            requestedUser[password] = email;
            connection.execute(
                update,
                [name, email, username, password, id],
                (error, results, fields) => {
                    if (error) {
                        res.status(500).json({ error: 'Error interno del servidor' });
                        return;
                    }
                    res.json({
                        "message": "user updated successfully",
                        "user": requestedUser,
                        "endpoints": {
                            "get users": "GET /users",
                            "get specific user": "GET /users/{id}",
                            "create user": "POST /users",
                            "update user": "PUT /users/{id}",
                            "delete user": "DELETE /users/{id}"
                        }
                    });
                }
            );
        }
    );
});
router.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    let query = "SELECT * FROM `user` where id=?;";
    let del = "DELETE FROM `user` WHERE id=?;";
    connection.execute(
        del,
        [id],
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: 'Error interno del servidor' });
                return;
            }
            let affectedRows = results.affectedRows;
            if (affectedRows == 0) {
                res.status(404).json({
                    "message": "user not found",
                });
            }
            else{
                res.json({
                    "message": "user deleted successfully",
                    "endpoints": {
                        "get users": "GET /users",
                        "get specific user": "GET /users/{id}",
                        "create user": "POST /users",
                        "update user": "PUT /users/{id}",
                        "delete user": "DELETE /users/{id}"
                    }
                })
            }
        }
    );



});
