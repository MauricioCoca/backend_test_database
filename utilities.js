
export function createUserTable(connection) {
    let createUserQuery = 'CREATE TABLE `user`(' +
        `id INT AUTO_INCREMENT,` +
        `name VARCHAR(31) NOT NULL,` +
        `email VARCHAR(31) NOT NULL,` +
        `username VARCHAR(31) NOT NULL UNIQUE,` +
        `password VARCHAR(31) NOT NULL,` +
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
                            "('Juan Perez', 'juan@perez.com', 'juanperez', 'qwerty'),"+
                            "('John Doe', 'test@test.com', 'johndoe', 'asdfkj');";
    connection.query(insertUsersQuery);
}