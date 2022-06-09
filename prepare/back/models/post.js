module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        // id가 기본적으로 들어있다
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글, 이모티콘 저장
    });
    Post.associate = (db) => {
        // 포스트를 작성한 사람
        db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
        // 다 대 다
        // 다 대 다는 중간 태이블이 하나 생김 : through을 통해 중간 테이블 이름 설정 가능
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags
        // 1 대 다
        db.Post.hasMany(db.Comment); // post.addComments, post.getComments
        db.Post.hasMany(db.Image); // post.addImages, post.getImages
        // 포스트에 좋아요를 누른 사람
        // as에 따라서 post.getLikers처럼 게시글 좋아요 누른 사람을 가져오게 됨
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }) // post.addLikers, post.removeLikers
        // PostId => RetweetId
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); // post.addRetweet
    };
    return Post;
};