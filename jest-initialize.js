const Model = require('./src/models/index');

module.exports = function() {
  return Model.sequelize.sync({ force: true, logging: false });
};
