module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        // id가 기본적으로 들어있다
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장
    });
    Comment.associate = (db) => {
        // userId : 1
        // postId : 3
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
};