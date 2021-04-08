"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "userBooks",
      [
        {
          userId: 1,
          bookId: 1,
          status: "reading",
          progress: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          bookId: 3,
          status: "read",
          progress: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          bookId: 3,
          status: "reading",
          progress: 80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          bookId: 1,
          status: "reading",
          progress: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          bookId: 2,
          status: "to-read",
          progress: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          bookId: 2,
          status: "reading",
          progress: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("userBooks", null, {});
  },
};
