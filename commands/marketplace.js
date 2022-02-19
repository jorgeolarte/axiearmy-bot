const { SlashCommandBuilder } = require("@discordjs/builders");
const { getOverviewToday } = require("../lib/graphQL");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("marketplace")
    .setDescription("Get marketplace stats!")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Select an option!")
        .setRequired(true)
        .addChoice("Last 24 hours", "last24Hours")
        .addChoice("Last 7 days", "last7Days")
        .addChoice("Last 30 days", "last30Days")
    ),
  async execute(interaction) {
    let option = interaction.options.getString("category");
    let stats = await getOverviewToday(option);

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Marketplace")
        .setStyle("LINK")
        .setURL("https://marketplace.axieinfinity.com")
    );

    const embed = new MessageEmbed()
      .setColor("#ff95b9")
      .setTitle("Marketplace Stats")
      .setURL("https://marketplace.axieinfinity.com")
      .setDescription(
        `Total sale: ${stats.count} \n Volumen: ${stats.volumeUsd} USD \n Axie Sold: ${stats.axieCount}`
      );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
