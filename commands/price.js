const { SlashCommandBuilder } = require("@discordjs/builders");
const { getCryptoPrice } = require("../lib/coingecko");

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
    let option = interaction.options.getString("category");
    let cryptoPrice = await getCryptoPrice(option);
    await interaction.reply(
      `El precio del ${option.toUpperCase()} es: **${cryptoPrice} USD**`
    );
  },
};
