
export function createUserTable(connection) {
    let createUserQuery = 'CREATE TABLE `user`(' +
        `id INT,` +
        `name varchar(31),` +
        `email varchar(31),` +
        `username varchar(31),` +
        `password varchar(31),` +
        `PRIMARY KEY(id)` +
        `);`;
    connection.query(
        createUserQuery
        // (err, results, fields) => {
        //     if(err) throw err;
        //     console.log(results);
        // }
    );
}
export function seedUserTable(connection){
    let insertUsersQuery = "INSERT INTO `user`(id, name, email, username, password) VALUES"+
                            "(1, 'Juan Perez', 'juan@perez.com', 'juanperez', 'qwerty'),"+
                            "(2, 'John Doe', 'test@test.com', 'johndoe', 'asdfkj');";
    connection.query(insertUsersQuery);
}