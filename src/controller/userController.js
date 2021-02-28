// 유저 관련

import routes from "../routes"
import User from "../models/User"
import passport from "passport"
import session from "express-session"
import Image from "../models/Image"
import Post from "../models/Post"
import nodemailer from "nodemailer"

export const getJoin = async (req, res) => {

    const user = await User.find({
        sex: '남자'
    })

    const u = await User.findOne({email:'developer'})
    u.avatarUrl = 
    // for(let k of u){

    //     console.log(k.avatarUrl.split('/')[4])
    //     k.avatarUrl = `./static/avatar/${k.avatarUrl.split('/')[4]}`
    //     k.save();
    // }
    


    res.render('join', {
        pageTitle: 'Home',
        user
    });
}
export const getFJoin = async (req, res) => {
    const user = await User.countDocuments({sex:'여자'});


    res.render('fjoin', {
        pageTitle: 'Home',
        user
    });
}
export const getNewJoin = async (req, res) => {


    res.render('newJoin', {
        pageTitle: 'Home'
    });
}

export const postFJoin = async (req, res, next) => {
    const {
        body: {
            name,
            sex,
            link,
            univ,
            age,
            mbti,
            description,
            style,
            email,
            password,
            password2,
            location,
            userEmail
        }
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render('fjoin', {
            pageTitle: 'Home'
        });

    } else {
        try {
            
            let webMails = ["snu.ac.kr","korea.ac.kr","yonsei.ac.kr","skku.edu","sogang.ac.kr","hanyang.ac.kr","cau.ac.kr","khu.ac.kr","hufs.ac.kr",
        "uos.ac.kr","ewha.ac.kr","ewhain.net","kaist.ac.kr","postech.ac.kr"]

            console.log("이메일인증시작")
            if(webMails.includes(userEmail.split("@")[1])){
                const user = await User({
                    name,
                    email,
                    mbti,
                    description,
                    sex,
                    link,
                    univ,
                    age,
                    style,
                    location
                });
                User.register(user,password);
                console.log("이메일인증")
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'qkr5882103@gmail.com',
                      pass: '960529Hh@@'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'qkr5882103@gmail.com',
                    to: `${userEmail}`,
                    subject: '연고링',
                    text: `ID: ${email} PWD: ${password}`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      
                      console.log('Email sent: ' + info.response);
                    }
                  });
                  res.redirect(routes.login)
            }else{
                res.redirect(routes.fjoin)
            }
            
        } catch (error) {
            console.log(error);
            res.redirect(routes.home)
            console.log("from postjoin")
        }
        // To Do: Register User
        // To Do: Log User In
    }
}

export const loginTest = async (req,res) => {
    const userList = [];

    try{
        

        for(let k of userList){
            const user = await User({
                name : k.name,
                email : k.email,
                mbti : k.mbti,
                description : k.description,
                sex : k.sex,
                link : k.link,
                univ : k.univ,
                age : k.age,
                style : k.style
            });
            User.register(user, k.password);
            console.log(1)
        }
    } catch(error){
        console.log(error)
    }
    
    
    
}

export const postJoin = async (req, res, next) => {
    const {
        body: {
            name,
            sex,
            link,
            univ,
            age,
            mbti,
            description,
            style,
            email,
            password,
            password2,
            userEmail
        }
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render('join', {
            pageTitle: 'Home'
        });

    } else {
        try {
            const user = await User({
                name,
                email,
                mbti,
                description,
                sex,
                link,
                univ,
                age,
                style
            });
            User.register(user, password);

            let webMails = ["snu.ac.kr","korea.ac.kr","yonsei.ac.kr","skku.edu","sogang.ac.kr","hanyang.ac.kr","cau.ac.kr","khu.ac.kr","hufs.ac.kr",
        "uos.ac.kr"]

            console.log("이메일인증시작")
            if(webMails.includes(userEmail.split("@")[1])){
                console.log("이메일인증")
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'smp2103@yonsei.ac.kr',
                      pass: '960529hh@@'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'smp2103@yonsei.ac.kr',
                    to: `${userEmail}`,
                    subject: '연고링',
                    text: `ID: ${email} PWD: ${password}`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            }else{
                console.log('email error')
            }
            
            next();
        } catch (error) {
            console.log(error);
            alert('정보를 확인해주세요')
            res.redirect(routes.home)
            console.log("from postjoin")
        }
        // To Do: Register User
        // To Do: Log User In
    }
}





export const getLogin = (req, res) => {
    res.render('login', {
        pageTitle: 'Join'
    });
}

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: {
            id,
            avatar_url,
            name,
            email
        }
    } = profile;
    try {
        const user = await User.findOne({
            email
        })
        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        } else {
            const newUser = await User.create({
                email,
                name,
                githubId: id,
                avatarUrl: avatar_url
            });
            return cb(null, newUser);
        }
    } catch (error) {
        return cb(error);
    }
};

export const postGitHubLogIn = (req, res) => {
    res.redirect(routes.home);
    console.log("from postGIthubLogin")
}




export const logout = (req, res) => {
    // To Do: Process logout
    req.logout();
    req.session.save(function () {
        res.redirect(routes.home);
        console.log("from logout")
    });
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('images');
        const images = user.images
        res.render('userDetail', {
            pageTitle: 'User Details',
            user,images
        });
    } catch (error) {
        const m = await User.countDocuments({sex:'남자'})
        const fm = await User.countDocuments({sex:'여자'})
        res.render('userDetail', {
            pageTitle: 'User Details',
            user: [],
            images: [],m,fm
        });
    }
}

export const userDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const user = await User.findById(id).populate('images');
        const images = user.images
        res.render('userDetail', {
            pageTitle: 'User Details',
            user,images
        });
    } catch (error) {
        res.render('userDetail', {
            pageTitle: 'User Details',
            user: [],
            images: []
        });
    }

}
export const getEditProfile = (req, res) => res.render('editProfile', {
    pageTitle: 'Edit Profile'
});

export const postEditProfile = async (req, res) => {
    const {
        body: {
            name,
            mbti,
            description,
            style,
            age,
            link,
            locat,
            hide
        },
        file
    } = req;

    try {
        console.log(file)
        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            mbti,
            description,
            style,
            age,
            link,
            avatarUrl: file ? `/static/avatar/${file.filename}` : req.user.avatarUrl,
            location : locat,
            hide : hide ? hide : 'n'
        });
        res.redirect(routes.home);
    } catch (error) {
        res.redirect(routes.editProfile)
    }
}

export const getChangePassword = (req, res) => res.render('changePassword', {
    pageTitle: 'Change Password'
});

export const postChangePassword = async (req, res) => {
    const {
        body: {
            oldPassword,
            newPassword,
            newPassword1
        }
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

export const filtering = async (req, res) => {
    const {
        body: {
            univ,
            mbti
        }
    } = req;

    if(univ==="" && mbti){

        const users= await User.find({
            mbti
        })

        res.render('newCommunity',{pageTitle:'연고링',users})
    } else if(univ && mbti===""){
        const users= await User.find({
            univ
        })

        res.render('newCommunity',{pageTitle:'연고링',users})
    } else if(univ && mbti){
        const users = await User.where('univ',`${univ}`).where('mbti',`${mbti}`)


        res.render('newCommunity',{pageTitle:'연고링',users})
    }

}

export const getUnivFilter = async (req, res) => {
    const users = await User.find({
        univ
    })
    res.render('univUser')
}

export const getMbtiFilter = async (req, res) => {
    const users = await User.find({
        mbti
    })
    res.render('mbtiUser')
}

export const getFullFilter = async (req, res) => {
    const users = await User.find({
        univ,
        mbti
    })
    res.render('fullUser')
}

export const kakao = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    console.log(id)
}

export const sendUserData = async (req, res) => {
    const userData = await User.find({})
    res.json(userData)
}

export const sendMbtiUserData = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    const userData = await User.find({
        mbti: id
    })
    res.json(userData)
}

export const likeUser = async (req, res) => {
    const {
        user
    } = req;
    //   const me = await User.findById(user);
    //   console.log(me)
    //   me.update(
    //       {like_user:[]}
    //   )
    //   const likeUserArray= me.like_user;
    //   console.log(likeUserArray);
    //   let likeUserData = [];
    //   for(let k of likeUserArray){
    //     const likeUser = await User.findById(k)
    //     likeUserData.push(likeUser)
    //   }

    //   console.log(likeUserData)

    res.render('likedUser', {
        pageTitle: 'Home'
    })
}

export const deleteUser = async (req, res) => {
    const {
        user
    } = req;
    const me = await User.findOneAndDelete({
        _id: user
    })

    res.redirect(routes.home)
}


export const getAlbumUpload = async (req,res) => {
    const {params:{id}} = req;
    const users = await User.findById(id)
    res.render('newImageUpload',{pageTitle:'앨범',users})
}

export const postAlbumUpload = async (req,res) => {
    const {params:{id},file} = req;
    const users = await User.findById(id)
    const image = await Image.create({
        fileUrl : file.location,
        creator: users._id
    })

    users.images.push(image._id)
    users.save();

    res.redirect(routes.me)
     
}

export const getAlbumDelete = async (req,res) => {

    const {params:{id}} = req;
    const user =  await User.findById(id).populate('images')
    const images = user.images
    console.log(images)

    res.render('albumDelete',{pageTitle:"연고링",images})
}

export const postAlbumDelete = async (req,res) => {

    try{
        const {body:{userId,imageId}} = req;
        const user = await User.findById(userId)
        await Image.findOneAndDelete(imageId);

        const images = user.images

        if(images.includes(imageId)) {
            images.splice(images.indexOf(imageId),1)
            user.images.splice(user.images.indexOf(imageId),1)
        }

        user.save();
        res.status(200).redirect(routes.userDetail(userId))
    } catch(error){
        
    }
    
    
}

export const postSearch = async(req,res) => {
    const {body:{age1,age2,sex}} = req;
    try{
        
        const users = await User.where('sex',`${sex}`).where('age').gte(parseInt(age1)-1).lte(parseInt(age2))
        
        res.render('search',{pageTitle:`검색`,users})
        
    } catch(error){
        console.log(error)
    }
}