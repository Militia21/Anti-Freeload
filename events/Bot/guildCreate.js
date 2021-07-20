const schema = require("../../schemas/winners");
module.exports = {
  name: "guildCreate",
  run: async (client, guild) => {
    console.log("i joined a new guild m8");
    new schema({
      id: guild.id,
    }).save();
  },
};
