const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "This is a ping command!",
  ownerOnly: true,
  cooldown: 20000,
  category: "Utility",
  run: async (client, message, args) => {
    message.channel.send("Pinging...").then(async (msg) => {
      const editEmbed = new MessageEmbed()
        .setTitle("Pinged.")
        .setColor("WHITE")
        .setDescription(`Client Webscocket Latency: \`${client.ws.ping}\``);

      setTimeout(async () => {
        msg.edit("Pong!", editEmbed);
      });
    });
  },
};
