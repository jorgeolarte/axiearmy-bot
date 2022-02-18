const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("my-stats")
    .setDescription("Get my stats!"),
  async execute(interaction) {
    await interaction.reply("AXS!");
  },
};
