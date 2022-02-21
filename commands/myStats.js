const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { hasDiscordId, getRonin, getStatsByRonin } = require("../lib/teamStats");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mystats")
    .setDescription("Hey trainer get your stats!"),
  async execute(interaction) {
    let messageReply = {
      title: "You need to be a trainer",
      message: "Sorry, but this command only works in trainers role",
      fields: [],
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
    .setDescription(`${messageReply.message}`)
    .addFields(messageReply.fields)
    .setThumbnail(
      "https://res.cloudinary.com/axiearmy-club/image/upload/v1645318880/axie-army/axie-army-logo-redes_bzpuhc.png"
    )
    .setTimestamp()
    .setFooter({
      text: "By Axie Army",
      iconURL:
        "https://res.cloudinary.com/axiearmy-club/image/upload/v1645318880/axie-army/axie-army-logo-redes_bzpuhc.png",
    });

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
    message: `These are your stats :sunglasses:`,
    fields: [
      {
        name: `:military_medal: **Rank**`,
        value: `${stats.rank}`,
        inline: false,
      },
      {
        name: `:trophy: **Cups**`,
        value: `${stats.cups}`,
        inline: false,
      },
      {
        name: `:dollar: **SLP**`,
        value: `${stats.slp}`,
        inline: false,
      },
    ],
  };
}
