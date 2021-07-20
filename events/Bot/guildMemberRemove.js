module.exports = {
  name: "guildMemberRemove",
  run: async (client, member) => {
    if (member.user === client.user) return;
    const DB = await client.schemas.winners.findOne({
      id: member.guild.id,
    });
    const logChannel = member.guild.channels.cache.get(DB.logChannel);
    if (DB.heistMode) {
      await member.ban({
        reason:
          "Freeloader! Watched leaving the server right after a heist happened.",
      });
      DB.freeloaders = DB.freeloaders + 1;
      DB.save();
      if (
        logChannel &&
        logChannel.viewable &&
        logChannel.permissionsFor(member.guild.me).has("SEND_MESSAGES")
      ) {
        logChannel.send(
          `\`${member.user.tag}\` was banned for freeloading.\nWas seen leaving the server when heist-mode was enabled.`
        );
      }
    }

    const List = DB.list;
    if (List.includes(member.id)) {
      await member.ban({ reason: `Freeloader.` });
      DB.freeloaders = DB.freeloaders + 1;
      DB.save();
      if (
        logChannel &&
        logChannel.viewable &&
        logChannel.permissionsFor(member.guild.me).has("SEND_MESSAGES")
      ) {
        logChannel.send(
          `\`${member.user.tag}\` was banned for freeloading.\nWas logged to have won a giveaway or participated in heist-events in the past!`
        );
      }
    }
  },
};
