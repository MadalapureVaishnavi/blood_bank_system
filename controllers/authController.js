const useModel = require("../models/useModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        const existinguser = await useModel.findOne({ email: req.body.email })
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: 'User Already exist'
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        const user = new useModel(req.body)
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error
        })
    }

};

const loginController = async (req, res) => {
    try {
        const existinguser = await useModel.findOne({ email: req.body.email })
        if (!existinguser) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        //check role
        if (existinguser.role !== req.body.role) {
            return res.status(500).send({
                success: false,
                message: "role doesn't match"
            });
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, existinguser.password)
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        const token = jwt.sign({ userId: existinguser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            token,
            existinguser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Login API',
            error
        })
    }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
    try {
        const user = await useModel.findOne({ _id: req.body.userId })
        return res.status(200).send({
            success: true,
            messaage: 'user fetched successfully',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'unable to get current user',
            error
        })
    }
};
module.exports = { registerController, loginController, currentUserController };