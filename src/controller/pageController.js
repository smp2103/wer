// 안쓰는 함수들


import Post from "../models/Post"
import User from "../models/User"


const makeQueryString = function (queryObject) {
    let queryString = ""
    for(let k in queryObject){
        if(queryObject[k] !==''){
            queryString += `${String(k)}=${queryObject[k]}&`
        }else{
            queryString += `${String(k)}=&`
        }
        
    }
    return queryString
}

const filterUndefined = function (queryObject) {
    let query = {};
    for(let k in queryObject){
        if(queryObject[k] !== ''){
            query[k] = queryObject[k]
        }
    }
    return query;
}

export const pagingController = async (req, res) => {
    const {query:{mbti,univ,name,page,age1,age2,locat}} = req;


    console.log(req.query)
    
    const timeForToday =  function (value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 2) {
            return `${betweenTimeDay}일전`;
        } else if(betweenTimeDay > 2){
            if(timeValue.getMinutes()<10){
                return `${timeValue.getMonth()+1}/${timeValue.getDate()} ${timeValue.getHours()}:0${timeValue.getMinutes()}`
            }
            return `${timeValue.getMonth()+1}/${timeValue.getDate()} ${timeValue.getHours()}:${timeValue.getMinutes()}`
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }
    try {
        const m = await User.countDocuments({sex:'남자'})
        const fm = await User.countDocuments({sex:'여자'})
        
        let a1 = age1 ? age1 : 19;
        let a2 = age2 ? age2 : 35;

        console.log(age1,age2)
        const option = filterUndefined({
            sex:'남자',
            univ,
            mbti,
            name,
            location : locat,
            age: {$gte:a1,$lte: a2}
        })
        const totalUser = await User.countDocuments(option); // (2)
        const queries = {univ,mbti,name,age1,age2,locat}
        const queryString = makeQueryString(queries)
        if (!totalUser) { // (3)
            throw Error();
        }
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalUser); // (4)

        const users = await User.find(option)
            .skip(hidePost)
            .limit(maxPost);



        res.render("newCommunity", { // (6)
            users,
            currentPage,
            startPage,
            endPage,
            maxPost,
            totalPage,
            totalUser,
            m,fm,
            timeForToday,
            queryString,
            univ,mbti,age1,age2
        });
    } catch (error) {
        console.log(error)
        const m = await User.countDocuments({sex:'남자'})
        const fm = await User.countDocuments({sex:'여자'})

        const totalUser = await User.countDocuments({sex:'남자'})
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalUser); // (4)

        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }
          
        const users = await User.find({sex:'남자'}).sort({_id:-1}).skip(hidePost).limit(maxPost)
        console.log(`start:${startPage} end:${endPage} hide:${hidePost} maxPost: ${maxPost} totalPage: ${totalPage} currentPage :${currentPage}`)
        res.render("newCommunity", {
            users,
            currentPage,
            startPage,
            endPage,
            maxPost,
            totalPage,
            totalUser,
            m,fm,
            timeForToday,
            univ,mbti
        }); // (7)
    }
};


export const pagingController2 = async (req, res) => {
    const {query:{mbti,univ,name,page,age1,age2,locat}} = req;


    
    const timeForToday =  function (value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 2) {
            return `${betweenTimeDay}일전`;
        } else if(betweenTimeDay > 2){
            if(timeValue.getMinutes()<10){
                return `${timeValue.getMonth()+1}/${timeValue.getDate()} ${timeValue.getHours()}:0${timeValue.getMinutes()}`
            }
            return `${timeValue.getMonth()+1}/${timeValue.getDate()} ${timeValue.getHours()}:${timeValue.getMinutes()}`
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }
    try {
        let a1 = age1 ? age1 : 19;
        let a2 = age2 ? age2 : 35;
        const m = await User.countDocuments({sex:'남자'})
        const fm = await User.countDocuments({sex:'여자'})
        const option = filterUndefined({
            sex:'여자',
            univ,
            mbti,
            name,
            location: locat,
            age: {$gte:a1,$lte: a2}
        })
        const totalUser = await User.countDocuments(option); // (2)
        const queries = {univ,mbti,name,age1,age2,locat}
        const queryString = makeQueryString(queries)
        if (!totalUser) { // (3)
            throw Error();
        }
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalUser); // (4)
        const users = await User.find(option).populate('creator') // (5)
            .sort({_id:-1})
            .skip(hidePost)
            .limit(maxPost);
        console.log(`start:${startPage} end:${endPage} hide:${hidePost} maxPost: ${maxPost} totalPage: ${totalPage} currentPage :${currentPage}`)
        
        res.render("newCommunity2", { // (6)
            users,
            currentPage,
            startPage,
            endPage,
            maxPost,
            totalPage,
            totalUser,
            timeForToday,
            m,fm,
            queryString,
            univ,mbti,age1,age2
        });
    } catch (error) {
        const totalUser = await User.countDocuments({sex:'여자'})
        const m = await User.countDocuments({sex:'남자'})
        const fm = await User.countDocuments({sex:'여자'})
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalUser); // (4)

        console.log(`start:${startPage} end:${endPage} hide:${hidePost} maxPost: ${maxPost} totalPage: ${totalPage} currentPage :${currentPage}`)
        const users = await User.find({sex:'여자'}).sort({_id:-1}).skip(hidePost).limit(maxPost)

        res.render("newCommunity2", {
            users,
            currentPage,
            startPage,
            endPage,
            maxPost,
            totalPage,
            m,fm,
            totalUser,
            timeForToday,
        }); // (7)
    }
};

const paging = (page, totalPost) => {
    const maxPost = 10; // (1)
    const maxPage = 100; // (2)
    let currentPage = page ? parseInt(page) : 1; // (3)
    const hidePost = page === 1 ? 0 : (page - 1) * maxPost; // (4)
    const totalPage = Math.ceil(totalPost / maxPost); // (5)

    if (currentPage > totalPage) { // (6)
        currentPage = totalPage;
    }

    const startPage = Math.floor(((currentPage - 1) / maxPage)) * maxPage + 1; // (7)
    let endPage = startPage + maxPage - 1; // (8)

    if (endPage > totalPage) { // (9)
        endPage = totalPage;
    }

    return {
        startPage,
        endPage,
        hidePost,
        maxPost,
        totalPage,
        currentPage
    }; // (10)
};


export default paging;