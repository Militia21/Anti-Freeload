const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "uptime",
  aliases: ["upt"],
  category: "Utility",
  description: "View for how long the bot has been online!",
  run: async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const uptimeEmbed = new MessageEmbed()
      .setAuthor("Client Uptime", client.user.displayAvatarURL())
      .setColor("#800000")
      .addField("Uptime", `${days}d ${hours}h ${minutes}m ${seconds}s`);

    message.channel.send(uptimeEmbed);
  },
};
