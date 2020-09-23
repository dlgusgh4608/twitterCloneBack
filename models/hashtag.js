module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', { //mysql에서는 hashtags 테이블 생성
        //id는 기본적으로 들어있다.
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //이모티콘 저장
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHash' });
    };
    return Hashtag;
};