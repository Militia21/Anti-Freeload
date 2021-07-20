const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "Information",
  description: "See all my available commands!",
  run: async (client, message, args) => {
    const emojimap = {
      Config: "⚙️",
      Information: "❓",
      Utility: "🛠️",
    };
    const bot = null;
    let embed = new MessageEmbed()
      .setTitle("Help Menu")
      .setColor("#800000")
      .setDescription("These are my commands.");
    client.categories.forEach((category) => {
      const cmds = client.commands.filter(
        (cmd) => cmd.category.toLowerCase() === category.toLowerCase()
      );
      const cmdMap = cmds.map((x) => `\`${x.name}\``).join(", ");
      embed.addField(`${emojimap[category]} ` + category, cmdMap);
    });

    if (!args.length) return message.channel.send(embed);

    const commandQuery = args.join(" ").toLowerCase();
    const command =
      client.commands.get(commandQuery) ||
      client.commands.get(client.aliases.get(commandQuery));

    if (!command)
      return message.channel.send(
        `That command does not exist! Use \`${client.prefix}help\` to view my commands.`
      );

    let cooldown = command.cooldown / 1000;
    if (isNaN(cooldown)) cooldown = "None";
    if (!isNaN(cooldown)) cooldown = `${cooldown} seconds`;
    const aliases = command.aliases.map((x) => `\`${x}\``).join(", ");
    let userPermissions;

    if (command.userPermissions)
      userPermissions = command.userPermissions
        .map((value) => `\`${value.toUpperCase().replace(/_/gi, " ")}\``)
        .join(", ");

    const cmdEmbed = new MessageEmbed()
      .setTitle(`Command Help - \`${command.name}\``)
      .setColor("#800000")
      .addField("Description", command.description || "None")
      .addField("Cooldown", cooldown)
      .addField("Category", command.category)
      .addField("Aliases", `${aliases || "None"}`)
      .addField("User Permissions", userPermissions || "None");

    message.channel.send(cmdEmbed);
  },
};
