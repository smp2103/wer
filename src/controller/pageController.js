// 안쓰는 함수들


import Post from "../models/Post"
import User from "../models/User"

export const pagingController = async (req, res) => {
    const {
        page
    } = req.query; // (1)
    try {
        const totalPost = await Post.countDocuments({}); // (2)
        if (!totalPost) { // (3)
            throw Error();
        }
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalPost); // (4)
        const posts = await Post.find({}).populate('creator') // (5)
            .sort({_id:-1})
            .skip(hidePost)
            .limit(maxPost);
        res.render("newCommunity", { // (6)
            posts,
            currentPage,
            startPage,
            endPage,
            maxPost,
            totalPage,
        });
    } catch (error) {
        res.render("newCommunity", {
            posts: []
        }); // (7)
    }
};


const paging = (page, totalPost) => {
    const maxPost = 10; // (1)
    const maxPage = 10; // (2)
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