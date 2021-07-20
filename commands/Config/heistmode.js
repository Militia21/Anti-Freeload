module.exports = {
  name: "heistmode",
  aliases: ["heistm", "hm"],
  cooldown: 15000,
  category: "Config",
  description: "Toggle the heist mode to watch for freeloaders!",
  userPermissions: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    const DB = await client.schemas.winners.findOne({
      id: message.guild.id,
    });
    if (DB.heistMode) {
      DB.heistMode = false;
      DB.save();
      message.channel.send(`\`Disabled\` heist mode.`);
    } else if (!DB.heistMode) {
      DB.heistMode = true;
      DB.save();
      message.channel.send(`\`Enabled\` heist mode.`);
    }
  },
};
