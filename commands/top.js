const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { bestTrainers } = require("../lib/teamStats");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Who are our best trainers!")
    .addStringOption(
      (option) =>
        option
          .setName("option")
          .setDescription("Select an option!")
          .setRequired(true)
          .addChoice("by world rank", "rank")
          .addChoice("by cups", "cups")
      // .addChoice("by SLP", "slp")
    ),
  async execute(interaction) {
    let option = interaction.options.getString("option");

    let trainers = await bestTrainers(option);

    let messageReply = {
      title: `Best trainers by ${option.toUpperCase()}`,
      content: `Discover who are our best trainers`,
      fields: [],
    };

    trainers.map((trainer, index) => {
      let text = concatTrainerOption(index, trainer[option]);

      messageReply.fields.push({
        name: `${index + 1}. ${trainer.name}`,
        value: `${text}`,
      });
    });

    await replyMessage(interaction, messageReply);
  },
};

function concatTrainerOption(index, option) {
  let text = index === 0 ? `:trophy: ` : ``;
  text += `_${option}_`;

  return text;
}

async function replyMessage(interaction, messageReply) {
  const embed = new MessageEmbed()
    .setColor("#ff95b9")
    .setTitle(`${messageReply.title}`)
    .setDescription(`${messageReply.content}`)
    .addFields(messageReply.fields)
    .setThumbnail(
      "https://res.cloudinary.com/axiearmy-club/image/upload/v1645318880/axie-army/axie-army-logo-redes_bzpuhc.png"
    )
    .setTimestamp()
    .setFooter({
      text: "Rank by Axie Army",
    });

  await interaction.reply({
    // ephemeral: true,
    embeds: [embed],
  });
}
