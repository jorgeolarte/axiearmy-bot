const { SlashCommandBuilder } = require("@discordjs/builders");

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
    await interaction.reply("slp!");
  },
};
