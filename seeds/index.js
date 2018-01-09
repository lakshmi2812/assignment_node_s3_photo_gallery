const mongoose = require("mongoose");
const mongooseeder = require("mongooseeder");
const models = require("../models");
const { User } = require("../models");

const mongodbUrl = "mongodb://localhost/your_db";

// //fname: String,
// lname: String,
// username: String,
// email: String
mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {
    let users = [];

    let user;
    for (let i = 0; i < 10; i++) {
      user = new User({
        fname: `fname${i}`,
        lname: `lname${i}`,
        email: `$user${i}@photos.com`,
        pwd: `$user${i}@photos.com`,
        username: `user${i}`
      });
      users.push(user);
    }

    const promises = [];
    const collections = [users];

    collections.forEach(collection => {
      collection.forEach(model => {
        const promise = model.save();
        promises.push(promise);
      });
    });

    return Promise.all(promises);
  }
});
