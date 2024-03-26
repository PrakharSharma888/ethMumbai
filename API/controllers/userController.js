const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const UserTest = (req, res) => {
    res.json({
        msg: "Helloooo Ji"
    })
}

const CreateUser = async (req, res) => {
    const { name, email, eoa, smartWalletAddress } = req.body;

    let existingUser = await UserModel.findOne({ eoa })

    if (existingUser) {
        return res.status(400).json({
            "message": "User Already Exists"
        });
    }

    const user = new UserModel({
        name,
        email,
        eoa,
        smartWalletAddress
    });


    user.save()
        .then(() => {
            const token = jwt.sign({
                userId: user._id
            }, 'secret');

            res.setHeader('Authorization', `Bearer ${token}`);

            res.status(200).json({
                "message": "User Created",
                "token": token
            });
        })
        .catch((err) => {
            res.status(500).json({
                "message": "Error"
            });
        });
}
const LoginUser = async (req, res) => {
    const { eoa } = req.body;

    const user = await UserModel.findOne({ eoa });

    if (!user) {
        return res.status(400).json({
            NoUser : true,
            message: "User Not Found"
        });
    }

    return res.status(200).json({
        message: "User Found",
    });
}


const UserData = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing" });
        }

        const decoded = jwt.verify(token, 'secret');

        if (!decoded.userId) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User Data",
            token: user
        });
    } catch (error) {
        console.error("Error in fetching user data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { UserTest, CreateUser, UserData, LoginUser }