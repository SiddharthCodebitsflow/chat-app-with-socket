const UserModel = require('../Model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { registerValidation, loginValidator } = require('../validator/userValidation');
const userModel = require('../Model/user.model');

const register = async (req, res) => {
    try {
        const formData = req.body;
        const errors = registerValidation(formData);

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ error: true, message: "Validation failed", errors });
        }

        const CryptPassword = await bcrypt.hash(formData.password, 10);
        const presentData = await UserModel.findOne({ email: formData.email });

        if (presentData) {
            res.status(409).json({ error: true, message: "Already exist user" });
        } else {

            const userModelData = new UserModel({
                name: formData.name,
                email: formData.email,
                password: CryptPassword,
            });

            const created = await userModelData.save();
            const { password, ...userWithoutPassword } = created.toObject();

            res.status(200).json({ error: false, message: "success", data: userWithoutPassword });
        }
    } catch (err) {
        res.status(500).json({ error: true, message: err });
    }
}

const login = async (req, res) => {
    try {
        const formData = req.body;
        const error = loginValidator(formData);
        if (Object.keys(error).length > 0) {
            return res.status(400).json({ error: true, message: "Validation failed", error });
        }

        const user = await UserModel.findOne({ email: formData.email });

        if (user) {
            const checkPassword = await bcrypt.compare(formData.password, user.password);
            if (checkPassword) {

                const { password, ...userWithoutPassword } = user.toObject();
                const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

                res.status(200).json({ error: false, message: "success", data: userWithoutPassword, token: token });
            } else {
                res.status(404).json({ error: true, message: "Authorization failed" });
            }
        } else {
            res.status(404).json({ error: true, message: "User not found" });
        }

    } catch (err) {
        res.status(500).json({ message: "something is woring", error: true, errorMsg: err });
    }
}

const getUser = async (req, res) => {
    const auth_id = req.auth_id;
    const userData = await UserModel.find({ _id: { $ne: auth_id } }).select('-password');
    res.status(200).json({ error: false, data: userData });
}

const user = async (req, res) => {
    const user_id = req.auth_id;
    const user = await userModel.findOne({ _id: user_id }).select('-password -__v');
    res.status(200).json({ error: false, message: "login true", login: true, userData: user });
}

module.exports = { register, login, getUser, user };
