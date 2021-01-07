import routes from "../routes"
import User from "../models/User"
import passport from "passport"
import session from "express-session"

export const getJoin = (req,res) =>{
    res.render('join',{pageTitle : 'Home'});
}
export const postJoin = async (req,res,next) => {
    const {
        body:{ name,sex,link,univ,age,mbti,description,email,password,password2}
    } = req;
    console.log(req.body.url)
    if(password!==password2){
        res.status(400);
        res.render('join',{pageTitle : 'Home'});
        
    }else{
        try{
            const user = await User({
                name,
                email,
                mbti,
                description,
                sex,
                link,
                univ,
                age
            });
            console.log(1)
            User.register(user,password);
            console.log(2)
            next();
        } catch(error){
            console.log(error);
            res.redirect(routes.home)
            console.log("from postjoin")
        }
        // To Do: Register User
        // To Do: Log User In
    }
}





export const getLogin = (req,res) => {
    res.render('login',{pageTitle : 'Join'});
    console.log(req.body)
}

export const postLogin = passport.authenticate('local',{
    failureRedirect : routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) =>{
    const {_json:{ id, avatar_url, name, email}} = profile;
    try{
        const user = await User.findOne({email})
        if(user){
            user.githubId = id;
            user.save();
            return cb(null,user);
        } else{
            const newUser = await User.create({
                email,
                name,
                githubId:id,
                avatarUrl: avatar_url
            });
            return cb(null,newUser);
        }
    }catch(error) {
        return cb(error);
    }
};

export const postGitHubLogIn = (req,res) => {
    res.redirect(routes.home);
    console.log("from postGIthubLogin")
}




export const logout = (req,res) => {
    // To Do: Process logout
    req.logout();
    req.session.save(function(){
        res.redirect(routes.home);
        console.log("from logout")
    });
}

export const getMe = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).populate("comments");
        console.log(user.comments)
        res.render('userDetail',{pageTitle : 'User Details',user});
    }catch(error){
        res.render('userDetail',{pageTitle : 'User Details',user:[]});
    }
}

export const userDetail = async (req,res) => {
    const {params:{ id }} =req;
    try{
        const user = await User.findById(id).populate('videos');
        res.render('userDetail',{pageTitle : 'User Details',user});
    }catch(error){
        console.log(error)
        res.redirect(routes.home)
        console.log("from userDetail")
    }
    
}
export const getEditProfile = (req,res) => res.render('editProfile',{pageTitle : 'Edit Profile'});

export const postEditProfile = async (req,res) => {
    const {
        body: {name,email,description},
        file
    }= req;
    try{
        const user = await User.findByIdAndUpdate(req.user.id,{
            name,
            email,
            description,
            avatarUrl: file ? file.location : req.user.avatarUrl
        });
        res.redirect(routes.me);
    }catch(error){
        res.redirect(routes.editProfile)
    }
}

export const getChangePassword = (req,res) => res.render('changePassword',{pageTitle : 'Change Password'});

export const postChangePassword = async (req, res) => {
    const {
      body: { oldPassword, newPassword, newPassword1 }
    } = req;
    try {
      if (newPassword !== newPassword1) {
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
        return;
      }
      await req.user.changePassword(oldPassword, newPassword);
      res.redirect(routes.me);
    } catch (error) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
    }
  };

  export const filtering = async (req,res) => {
      const {body: {univ,mbti}} = req;
      
      const users_univ = await User.find({univ})
      const users_mbti = await User.find({mbti})
      const users = await User.find({univ,mbti})

  }

  export const getUnivFilter = async (req,res) => {
        const users = await User.find({univ})
        res.render('univUser')
  }
  
  export const getMbtiFilter = async (req,res) => {
        const users = await User.find({mbti})
        res.render('mbtiUser')
  }

  export const getFullFilter =  async (req,res) => {
        const users = await User.find({univ,mbti})
        res.render('fullUser')
  }