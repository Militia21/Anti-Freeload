const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  run: async (client) => {
    console.log(`${client.user.tag} is ready to go!`);

    client.user.setActivity({
      name: `Freeloader Simulator v1.0.1`,
      type: "PLAYING",
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
