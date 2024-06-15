const connection = require('../config/database');
const {getAllUsers, getUserById} = require('../service/UserService');

const getHomepage = async(req, res) => {
   let results = await getAllUsers();
   console.log("all users", JSON.stringify(results))
    return res.render('home.ejs', {listUsers: results})
}

const getPTIT = (req, res) => {
    res.render('sample.ejs')
}

const createUser = async (req, res) => {
    //có thể ghi như sau
    //let {email, name, city} = req.body

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city
    console.log("lay tu html: ", email, name, city)

    //Sử dụng Async/Await
    let [results, fields] = await connection.query(
        `INSERT INTO Users(email, name, city)           
            VALUES (?, ?, ?)`,                          //lỗi các trường không thể gõ tiếng việt
        [email, name, city],
    );

    console.log(results);
    getHomepage()

    //Sử dụng callback
    // connection.query(
    //     `INSERT INTO Users(email, name, city)           
    //     VALUES (?, ?, ?)`,                          //lỗi các trường không thể gõ tiếng việt
    //     [email, name, city],
    //     function(err, results){
    //         if (err) {
    //             console.error("Error executing query:", err);
    //             res.status(500).send("Database error");
    //             return;
    //         }
    //         console.log(results);
    //         res.send(JSON.stringify(results))
    //     }
    // );



}

const updateUser = async (req, res) => {
    
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city
    let userId = req.body.userId;

    console.log("lay tu html: ", email, name, city)

    try {
        // Sử dụng Async/Await để cập nhật thông tin người dùng
        let [results] = await connection.query(
            `UPDATE Users
            SET email = ?, name = ?, city = ?
            WHERE id = ?;`,
            [email, name, city, userId]
        );

        console.log(results);

        // Nếu cập nhật thành công, chuyển hướng về trang chủ
        if (results.affectedRows > 0) {
            res.redirect('/');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error("Lỗi khi cập nhật người dùng:", err);
        res.status(500).send("Database error");
    }
}

const goToCreateUser = (req, res) => {
    res.render('create.ejs')
}
const goToUpdateUser = async(req, res) => {
    console.log("id is: ", req.params.userId)
    const userId = req.params.userId;

    let [results, fields] = await getUserById(userId);

    console.log("user is: ", results);
    res.render('update.ejs', {oldUser: results})
}
module.exports = {
    getHomepage,
    getPTIT,
    createUser,
    updateUser,
    goToCreateUser,
    goToUpdateUser
}