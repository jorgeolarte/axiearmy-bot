const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("price")
    .setDescription("Get cryptocurrency price!")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Select a crypto!")
        .setRequired(true)
        .addChoice("SLP", "slp")
        .addChoice("AXS", "axs")
        .addChoice("RON", "ron")
    ),
  async execute(interaction) {
    await interaction.reply("AXS!");
  },
};
