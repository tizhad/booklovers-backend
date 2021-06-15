"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "books",
      [
        {
          googleID: "g3kFEAAAQBAJ",
          title: "Operations Anti-Patterns, DevOps Solutions",
          rate: null,
          imageURL:
            "http://books.google.com/books/content?id=g3kFEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          author: "Jeffery D. Smith",
          categories: "Education",
          description:
            "Operations Anti-Patterns, DevOps Solutions shows how to implement DevOps techniques in the kind of imperfect environments most developers work in.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          googleID: "hBSGDwAAQBAJ",
          title: "DevOps - A Business Perspective",
          rate: null,
          imageURL:
            "http://books.google.com/books/content?id=hBSGDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          author: "Oleg Skrynnik",
          categories: "Business & Economics",
          description:
            "his book explains the management aspects of DevOps for those who are professionally engaged in information and technology management.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          googleID: "H6x-DwAAQBAJ",
          title: "The Phoenix Project",
          rate: 4.5,
          imageURL:
            "http://books.google.com/books/content?id=H6x-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          author: "Gene Kim",
          description:
            "ver a half-million sold! The sequel, The Unicorn Project, is coming Nov 26*** “Every person involved in a failed IT project should be forced to read this book.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          googleID: "nO1FDAAAQBAJ",
          title: "Effective DevOps",
          rate: 4,
          imageURL:
            "http://books.google.com/books/content?id=nO1FDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          author: "Jennifer Davis Ryn Daniels ",
          categories: "Business & Economics",
          description:
            "Some companies think that adopting devops means bringing in specialists or a host of new tools.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("books", null, {});
  },
};
