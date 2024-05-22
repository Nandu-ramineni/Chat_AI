import User from '../Model/userSchema.js';

export const userSignup = async (req, res) => {
    try {
        const exist =await User.findOne({userName: req.body.userName});
        if(exist) return res.status(401).json({message: "User already exists"})
        const user = req.body;
        const newUser=new User(user);
        await newUser.save();
        res.status(200).json({message: user});
        console.log(res)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const userLogin = async (req, res) => {
    try {
        const username = req.body.userName;
        const password = req.body.password;
        let user =await User.findOne({userName: username, password: password});
        if(user){
            return res.status(200).json(`Welcome ${user.userName} ${user}`);
        } else {
            return res.status(401).json({message: "Invalid Credentials"});
        }
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
