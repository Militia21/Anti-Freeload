const schema = require("../../schemas/winners.js");

module.exports = {
  name: "message",
  run: async (client, message) => {
    if (
      !message.content.startsWith(client.prefix) ||
      message.author.bot ||
      !message.guild
    )
      return;

    const args = message.content.slice(client.prefix.length).split(/ +/g);
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
