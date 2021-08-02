const schema = require("../../schemas/winners.js");
const ms = require("ms");

module.exports = {
  name: "message",
  run: async (client, message) => {
    if (!message.guild) return;

    if (
      message.channel.id === "854266708844085249" &&
      message.author !== client.user &&
      message.author.bot
    ) {
      message.channel.send(
        "<:dj_AngryPing:854558385773084692> **Annoyed by this ping**\n\nThen follow these instructions:\n<a:dj_arrow2:858732440464785419> Go to <#854561150465605642> and get <@&854280331314200596>\n<a:dj_arrow2:858732440464785419> Get all the ping-roles from <#854561150465605642> so you **NEVER** miss out on our heists!\n<a:dj_arrow2:858732440464785419> Checkout <#859687290515357716> for over **200 mil** worth of giveaways as compensation for this ping!"
      );
    }

    const DB = await client.schemas.winners.findOne({
      id: message.guild.id,
    });

    if (
      !message.content.startsWith(DB.prefix) ||
      message.author.bot ||
      !message.guild
    )
      return;

    const args = message.content.slice(DB.prefix.length).split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const command =
      client.commands.get(cmd.toLowerCase()) ||
      client.commands.get(client.aliases.get(cmd.toLowerCase()));

    if (!command) return;

    if (
      command.ownerOnly === true &&
      !client.owners.includes(message.author.id)
    )
      return;

    if (!message.member.permissions.has(command.userPermissions || []))
      return message.channel.send(
        `You don't have the required permissions to run this command: ${command.userPermissions
          .map((value) => `\`${value[0].toUpperCase().replace(/_/gi, " ")}\``)
          .join(", ")}`
      );

    if (!message.guild.me.permissions.has(command.botPermissions || []))
      return message.channel.send(
        `I do not have the required permissions to run this command: ${command.botPermissions
          .map(
            (value) =>
              `${
                value[0].toUpperCase() +
                value.toLowerCase().slice(1).replace(/_/gi, " ")
              }`
          )
          .join(", ")}`
      );

    try {
      if (client.cooldowns.has(`${message.author.id}-${command.name}`)) {
        return message.channel.send(
          `Slow down! Try running this command in \`${ms(
            client.cooldowns.get(`${message.author.id}-${command.name}`) -
              Date.now(),
            { long: true }
          )}\``
        );
      }

      await command.run(client, message, args);

      if (command.cooldown) {
        client.cooldowns.set(
          `${message.author.id}-${command.name}`,
          Date.now() + command.cooldown
        );

        setTimeout(() => {
          client.cooldowns.delete(`${message.author.id}-${command.name}`);
        }, command.cooldown);
      }
    } catch (e) {
      return console.log(e);
    }
  },
};
