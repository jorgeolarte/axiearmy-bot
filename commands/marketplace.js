const { SlashCommandBuilder } = require("@discordjs/builders");
const { getOverviewToday } = require("../lib/graphQL");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const OPTIONS_CONFIG = {
  last7Days: "last 7 days",
  last24Hours: "last 24 days",
  last30Days: "last 30 days",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("marketplace")
    .setDescription("Get marketplace stats!")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Select an option!")
        .setRequired(true)
        .addChoice("last 7 days", "last7Days")
        .addChoice("last 24 hours", "last24Hours")
        .addChoice("last 30 days", "last30Days")
    ),
  async execute(interaction) {
    let optionValue = interaction.options.getString("category");
    let optionName = getNameOption(optionValue);
    let stats = await getOverviewToday(optionValue);

    let messageReply = {
      title: "Marketplace Stats",
      description: `Checkout ${optionName} transactions`,
      titleButton: "Go to Marketplace",
      urlButton: "https://marketplace.axieinfinity.com",
      stats: {
        count: stats.count,
        volumeUsd: stats.volumeUsd,
        axieCount: stats.axieCount,
      },
    };

    await replyMessage(interaction, messageReply);
  },
};

async function replyMessage(interaction, messageReply) {
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel(`${messageReply.titleButton}`)
      .setStyle("LINK")
      .setURL(`${messageReply.urlButton}`)
  );

  const embed = new MessageEmbed()
    .setColor("#ff95b9")
    .setTitle(`${messageReply.title}`)
    .setURL(`${messageReply.urlButton}`)
    .setDescription(`${messageReply.description}`)
    .addFields(
      {
        name: `:chart_with_upwards_trend: Total sale`,
        value: `${messageReply.stats.count}`,
      },
      { name: `:coin: Volumen`, value: `${messageReply.stats.volumeUsd} USD` },
      {
        name: `:bar_chart: Axie Sold`,
        value: `${messageReply.stats.axieCount}`,
      }
    )
    .setThumbnail(
      "https://res.cloudinary.com/axiearmy-club/image/upload/v1645450491/axie-army/axieinfinitylogo-freelogovectors.net__abxtx2.png"
    )
    .setTimestamp()
    .setFooter({
      text: "Stats by Axie Infinity",
      iconURL:
        "https://res.cloudinary.com/axiearmy-club/image/upload/v1645450237/coin-gecko/axie_infinity_logo_u14vqq.png",
    });

  await interaction.reply({ embeds: [embed], components: [row] });
}

function getNameOption(optionValue) {
  return OPTIONS_CONFIG[optionValue] || OPTIONS_CONFIG["last7Days"];
}
