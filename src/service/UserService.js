const connection = require( "../config/database")

const getAllUsers = async () => {
    let [results, fields] = await connection.query(
        `select * from Users`,
    );
    console.log("from service", results);
    return results;
}

const getUserById = async(userId) => {
    let [results, fields] = await connection.query(
        `select * from Users u where u.id = ?`, [userId]
    );
    return results;
}

module.exports = {
    getAllUsers,
    getUserById
}