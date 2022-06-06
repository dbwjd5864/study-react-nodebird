module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // mySQL에는 users 테이블 생성
        // id는 mySQL에서 자동으로 1,2,3,4 ..으로 순서대로 올라간다
        // id는 기본적으로 존재
        email: {
            type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, // 필수
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, // 필수
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, // 필수
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
    });
    User.associate = (db) => {};
    return User;
};