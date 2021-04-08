"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userBook.belongsTo(models.user);
      userBook.belongsTo(models.book);
    }
  }
  userBook.init(
    {
      status: {
        type: DataTypes.STRING,
        defaultValue: "to-read",
      },
      progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "userBook",
    }
  );
  return userBook;
};
