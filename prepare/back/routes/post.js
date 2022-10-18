const express = require('express');
const { Post, Image, Comment, User } = require('../models');

const router = express.Router();

router.get('/:postId', async (req, res, next) => { // GET /post/1
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(404).send('존재하지 않는 게시글입니다.');
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }],
        })
        res.status(200).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/', (req, res) => {
    res.json({id: 1, content: 'hello'});
})

router.delete('/', (req, res) => {
    res.json({id: 1});
})

module.exports = router;

// 노드는 웹팩을 안쓰기 때문에 Import, export default를 사용하는 것이 아닌 require와 module.exports를 사용한다