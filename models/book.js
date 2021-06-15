"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsToMany(models.user, {
        through: "userBooks",
        foreignKey: "bookId",
      });
    }
  }
  book.init(
    {
      googleID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categories: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      imageURL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return book;
};
