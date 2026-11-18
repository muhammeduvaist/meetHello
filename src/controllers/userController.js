const getLogin = (req, res) => {
    res.render("userPages/login");
};

const getHome = (req, res) => {
    res.render("userPages/home");
};
const getSignup =(req,res)=>{
    res.render("userPages/signup")
}
module.exports = {
    getLogin,
    getHome,
    getSignup
};