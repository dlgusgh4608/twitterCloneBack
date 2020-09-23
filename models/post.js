module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { //mysql에서는 posts 테이블 생성
        //id는 기본적으로 들어있다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //이모티콘 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHash' });
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' });
        db.Post.belongsTo(db.Post, { as: 'Retwwt' })
    };
    return Post;
};