module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { //mysql에서는 users 테이블 생성
        //id는 기본적으로 들어있다.
        email: {
            type: DataTypes.STRING(30),   //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, //필수
            unique: true, //고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, //필수
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreigKey:'FollowingId' })
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreigKey:'FollowerId' })
    };
    return User;
};