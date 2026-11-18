const User = require('../model/userModel')

const getLogin = (req, res) => {
    res.render("userPages/login");
};
const getHome = (req, res) => {
    res.render("userPages/home");
};
const getSignup = (req, res) => {
    res.render("userPages/signup")
}
const registerUser = async (req, res) => {

    try {
        let { name, email, password } = req.body;
        console.log("req.body ::: ", req.body)
        if (!name) {
            return res.status(400).json({ message: "name required" });
        }
        if (!email) {
            return res.status(400).json({ message: "email required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password required" });
        }
        const user = new User({
            name,
            email,
            password
        });
        await user.save();
       return res.status(200).json({
    success: true,
    message: "Registered successfully!",
    redirectUrl: "/"
});
    }
    catch (error) {
        console.log("Error while creating user:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                field: "email",
                message: "Email is required"
            });
        }

        if (!password || !password.trim()) {
            return res.status(400).json({
                success: false,
                field: "password",
                message: "Password is required"
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                field: "email",
                message: "Account not found. Please sign up."
            });
        }

        if (user.password !== password) {
            return res.status(400).json({
                success: false,
                field: "password",
                message: "Incorrect password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            redirectUrl: "/"
        });
    } catch (error) {
        console.log("Login error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        });
    }
};


module.exports = {
    getLogin,
    getHome,
    getSignup,
    registerUser,
    loginUser
};