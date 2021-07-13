const schema = require('../../schemas/winners');
module.exports = {
  name: 'guildCreate',
  run: async(client, guild) => {
    new schema({
      id: guild.id,
    }).save();
  }
}