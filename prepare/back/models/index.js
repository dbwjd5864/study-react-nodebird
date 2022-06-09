const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// sequelize는 내부적으로 mySQL 툴을 사용하고 있음
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);;
db.Image = require('./image')(sequelize, Sequelize);;
db.Post = require('./post')(sequelize, Sequelize);;
db.User = require('./user')(sequelize, Sequelize);;



// 각 db associate의 관계 연결
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
