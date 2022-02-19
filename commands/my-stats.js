const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { hasDiscordId, getRonin, getStatsByRonin } = require("../lib/teamStats");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("my-stats")
    .setDescription("Get my stats!"),
  async execute(interaction) {
    if (
      interaction.member.roles.cache.has(process.env.DISCORD_TRAINER_ROLE_ID)
    ) {
      if (
        await hasDiscordId({
          discordId: interaction.user.id,
        })
      ) {
        let trainer = await getRonin({ discordId: interaction.user.id });

        let stats = await getStatsByRonin(trainer.ronin);

        const embed = new MessageEmbed()
          .setColor("#ff95b9")
          .setTitle(`${trainer.name} | ${trainer.team}`)
          .setDescription(
            `These are your stats :sunglasses: \n\n :military_medal: **Rank:** ${stats.rank} \n :trophy: **Cups:** ${stats.cups} \n :dollar: **SLP:** ${stats.slp}`
          );

        await interaction.reply({
          ephemeral: true,
          embeds: [embed],
        });
      } else {
        await interaction.reply({
          content: `No estas configurado`,
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: `No tienes permisos`,
        ephemeral: true,
      });
    }
  },
};
