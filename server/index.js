const express = require('express')
const app = express()
const port = 3001
const bcrypt = require("bcryptjs")
const db = require('./db')
const JWT = require("jsonwebtoken")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const validateToken = require("./middleware/fetchUser.js")


app.use(express.json())
app.use(cors())
app.use("/photo", express.static("./Images"))


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/gif') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const storage = multer.diskStorage({
    destination: "./Images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1000000
    }
})

// UPLOADING IMG

app.post("/uploadImg", upload.single("photo"),validateToken, async (req, res) => {

    const q = `UPDATE users SET img = ? WHERE id = ?`

    db.query(q, [req.file.filename, req.user.id], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json({ success: true, msg: "Image uploaded successfully." })
    })
})
// REMOVING IMG

app.post("/removeImg/:id", async (req, res) => {

    const id = req.params.id

    const q = `UPDATE users SET img = "" WHERE id = ?`

    db.query(q, [id], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json({ success: true, msg: "Image removed successfully." })
    })
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: false,
            msg: err.message
        })
    }
}
app.use(errHandler)

// USER REGISTRATION

app.post("/register", (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? "
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json({msg:"User already exists!",success:false})

        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(req.body.password, salt)
        const values = [
            req.body.email,
            req.body.username,
            req.body.profession,
            hashPass
        ]
        const q = "INSERT INTO users (`email`,`username`,`profession`,`password`) VALUES(?)"

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json({msg:"User has been created!",success:true})
        })
    })
})

// USER LOGIN 

app.post("/login", (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json({msg:"User not found !",success:false})

        const isPassCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if (!isPassCorrect) return res.status(400).json({msg:"Wrong credentials!",success:false})

        const authToken = JWT.sign({
            id: data[0].id
        }, "JwtSecretKey")

        const { password, ...other } = data[0]
        res.json({ authToken, success: true })


    })
})

// GET ALL USERS INFO

app.get("/allUserInfo", (req, res) => {
    const q = "SELECT id,username,img,profession FROM users";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("No user found !")
        res.json(data)
    })
})

app.get("/userInfo", validateToken, (req, res) => {

    const q = "SELECT id,username,email,profession,img FROM users WHERE id = ?";

    db.query(q, [req.user.id], (err, data) => {
        if (err) return res.json({ err, success: false })
        if (data.length === 0) return res.status(404).json({ msg: "User not found !", success: false })
        res.json({ data, success: true })
    })
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})