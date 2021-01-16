// 유저 관련

import routes from "../routes"
import User from "../models/User"
import passport from "passport"
import session from "express-session"
import Image from "../models/Image"

export const getJoin = async (req, res) => {

    const user = await User.find({
        sex: '남자'
    })

    console.log(user.length)



    res.render('join', {
        pageTitle: 'Home',
        user
    });
}
export const getFJoin = async (req, res) => {
    const user = await User.find({
        sex: '여자'
    });


    res.render('fjoin', {
        pageTitle: 'Home',
        user
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
            password2
        }
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render('fjoin', {
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
            next();
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

    const userList =[];
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
            password2
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
        res.render('userDetail', {
            pageTitle: 'User Details',
            user: [],
            images: []
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
            link
        },
        file
    } = req;

    try {
        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            mbti,
            description,
            style,
            age,
            link,
            avatarUrl: file ? file.location : req.user.avatarUrl
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

    const users_univ = await User.find({
        univ
    })
    const users_mbti = await User.find({
        mbti
    })
    const users = await User.find({
        univ,
        mbti
    })

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
    const {body:{userId,imageId}} = req;
    const user = await User.findById(userId)
    const image = await Image.findOneAndDelete(imageId);

    const images = user.images

    if(images.includes(imageId)) {
        images.splice(images.indexOf(imageId),1)
    }

    user.save();

    res.redirect(routes.me)
    
}