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

    const newUser = await user.save();

    if (!newUser) {
        return res.json({
            "message": "Error in creating user"
        })
    }
    const token = jwt.sign({
        userId: user._id
    }, 'secret');

    res.cookie('token', token, {
        httpOnly: true,
    });

    res.status(200).json({
        "message": "User Created",
        status: 200,
        user
    });

}
const LoginUser = async (req, res) => {
    try {
        const { eoa } = req.body;

        const user = await UserModel.findOne({ eoa });

        if (!user) {
            return res.json({
                status: 400,
                message: "User Not Found"
            });
        }

        const token = jwt.sign({
            userId: user._id
        }, 'secret');

        res.cookie('token', token, {
            httpOnly: true,
        });

        const decoded = jwt.verify(token, 'secret');

        if (!decoded.userId) {
            return res.json({ message: "Invalid token", status: 401 });
        }

        res.json({
            status: 200,
            user
        });
        // console.log('Getting User Data');
    } catch (error) {
        console.error("Error in logging in or fetching user data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




// const UserData = async (req, res) => {
//     try {
//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(401).json({ message: "Authorization token is missing" });
//         }

//         const decoded = jwt.verify(token, 'secret');


//         if (!decoded.userId) {
//             return res.status(401).json({ message: "Invalid token" });
//         }

//         const user = await UserModel.findById(decoded.userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json({
//             message: "User Data",
//             user
//         });
//         console.log('Getting User Data');
//     } catch (error) {
//         console.error("Error in fetching user data:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };


module.exports = { UserTest, CreateUser, LoginUser }