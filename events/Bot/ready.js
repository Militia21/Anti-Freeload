const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  run: async (client) => {
    console.log(`${client.user.tag} is ready to go!`);

    client.user.setActivity({
      name: 'freeloaders.',
      type: "WATCHING",
    });

    mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB!");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB!");
    });
  },
};
