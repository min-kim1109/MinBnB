'use strict';
/** @type {import('sequelize-cli').Migration} */
const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-01-01',
        endDate: '2023-01-03'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-02-01',
        endDate: '2023-02-03'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2023-03-01',
        endDate: '2023-03-03'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '2023-03-01',
        endDate: '2023-03-03'
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2023-03-01',
        endDate: '2023-03-03'
      },
      {
        spotId: 6,
        userId: 1,
        startDate: '2023-03-01',
        endDate: '2023-03-03'
      },
      {
        spotId: 7,
        userId: 1,
        startDate: '2023-03-01',
        endDate: '2023-03-03'
      },
      {
        spotId: 8,
        userId: 1,
        startDate: '2023-03-01',
        endDate: '2023-03-03'
      },

    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
