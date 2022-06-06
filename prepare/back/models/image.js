module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        // id가 기본적으로 들어있다
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장
    });
    Image.associate = (db) => {};
    return Image;
};