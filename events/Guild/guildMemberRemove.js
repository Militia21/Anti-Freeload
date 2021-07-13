module.exports = {
  name: 'guildMemberRemove',
  run: async(client, member) => {
    if(member.user === client.user) return;
    const DB = client.schemas.winners.findOne({
      id: member.guild.id
    });
    if(DB.list.includes(member.id)) {
      await member.ban({ reason: `Freeloader.` })
    }
  }
}