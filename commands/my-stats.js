const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { hasDiscordId, getRonin, getStatsByRonin } = require("../lib/teamStats");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("my-stats")
    .setDescription("Get my stats!"),
  async execute(interaction) {
    let messageReply = {
      title: "You need to be a trainer",
      message: "Sorry, but this command only works in trainers role",
    };

    messageReply = interaction.member.roles.cache.has(
      process.env.DISCORD_TRAINER_ROLE_ID
    )
      ? await getMessageIfUserExist({ discordId: interaction.user.id })
      : messageReply;

    await replyMessage(interaction, messageReply);
  },
};

async function replyMessage(interaction, messageReply) {
  const embed = new MessageEmbed()
    .setColor("#ff95b9")
    .setTitle(`${messageReply.title}`)
    .setDescription(`${messageReply.message}`);

  await interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
}

async function getMessageIfUserExist({ discordId }) {
  if (!(await hasDiscordId({ discordId }))) {
    return {
      title: `Must be configured by admin`,
      message: `Your username isn't configured yet`,
    };
  }

  let trainer = await getRonin({ discordId });
  let stats = await getStatsByRonin(trainer.ronin);

  return {
    title: `${trainer.name} | ${trainer.team}`,
    message: `These are your stats :sunglasses: \n\n :military_medal: **Rank:** ${stats.rank} \n :trophy: **Cups:** ${stats.cups} \n :dollar: **SLP:** ${stats.slp}`,
  };
}
