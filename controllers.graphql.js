import { connection } from './app.js';

export const getUsers = async () => {
    let query = 'SELECT * FROM `user`;';
    try {
        const [rows, fields] = await connection.query(query);
        return rows;
    } catch (error) {
        console.error('Error fetching users ', error);
        throw error;
    }
};
export const getUser = async (id) => {
    let query = 'SELECT * FROM `user` WHERE `user`.id = ?;';
    try {
        const [rows, fields] = await connection.execute(query, [id]);
        return rows[0];
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
};
export const createUser = async (name, email, username, password) => {
    //falta verificar que cada campo not null y unique sean controlados
    let query =
        'INSERT INTO `user`(name, email, username, password) VALUES' +
        '(?, ?, ?, ?);';
    try {
        let message = await connection.execute(
            query,
            [name, email, username, password]
        );
        return "Se creo un nuevo usuario con exito";
    } catch (e) {
        console.log('Error: ', error);
        throw e;
    }
};
// export const updateUser = (req, res) => {
//     const id = req.params.id;
//     if (isNaN(id)) {
//         res.status(400).json({
//             message: 'invalid user id',
//         });
//         return;
//     }
//     let { name, email, username, password } = req.body;
//     let query = 'SELECT * FROM `user` WHERE `user`.id = ?;';
//     let update =
//         'UPDATE `user` SET name=?, email=?, username=?, password=? where id=?;';
//     connection.execute(query, [id], (error, results, fields) => {
//         if (error) {
//             res.status(500).json({ error: 'Error interno del servidor' });
//             return;
//         }
//         if (results.length == 0) {
//             res.status(404).json({
//                 message: 'user not found',
//             });
//         }
//         let requestedUser = results[0];
//         requestedUser['name'] = name;
//         requestedUser['email'] = email;
//         requestedUser['username'] = email;
//         requestedUser['password'] = password;
//         connection.execute(
//             update,
//             [name, email, username, password, id],
//             (error, results, fields) => {
//                 if (error) {
//                     res.status(500).json({
//                         error: 'Error interno del servidor',
//                     });
//                     return;
//                 }
//                 res.json({
//                     message: 'user updated successfully',
//                     user: requestedUser,
//                     endpoints: {
//                         'get users': 'GET /users',
//                         'get specific user': 'GET /users/{id}',
//                         'create user': 'POST /users',
//                         'update user': 'PUT /users/{id}',
//                         'delete user': 'DELETE /users/{id}',
//                     },
//                 });
//             }
//         );
//     });
// };
// export const deleteUser = (req, res) => {
//     const id = req.params.id;
//     if (isNaN(id)) {
//         res.status(400).json({
//             message: 'invalid user id',
//         });
//         return;
//     }
//     let query = 'SELECT * FROM `user` where id=?;';
//     let del = 'DELETE FROM `user` WHERE id=?;';
//     connection.execute(del, [id], (error, results, fields) => {
//         if (error) {
//             res.status(500).json({ error: 'Error interno del servidor' });
//             return;
//         }
//         let affectedRows = results.affectedRows;
//         if (affectedRows == 0) {
//             res.status(404).json({
//                 message: 'user not found',
//             });
//         } else {
//             res.json({
//                 message: 'user deleted successfully',
//                 endpoints: {
//                     'get users': 'GET /users',
//                     'get specific user': 'GET /users/{id}',
//                     'create user': 'POST /users',
//                     'update user': 'PUT /users/{id}',
//                     'delete user': 'DELETE /users/{id}',
//                 },
//             });
//         }
//     });
// };
