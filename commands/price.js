const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { getCryptoPrice } = require("../lib/coingecko");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("price")
    .setDescription("Get cryptocurrency price!")
    .addStringOption((option) =>
      option
        .setName("currency")
        .setDescription("Select a crypto!")
        .setRequired(true)
        .addChoice("SLP", "slp")
        .addChoice("AXS", "axs")
        .addChoice("RON", "ron")
        .addChoice("ETH", "eth")
    ),
  async execute(interaction) {
    let option = interaction.options.getString("currency");
    let { cryptoId, name, price, imageURL } = await getCryptoPrice(option);

    let messageReply = {
      title: `View on CoinGecko`,
      message: `Current ${option.toUpperCase()} price \n **${price} USD**`,
      url: `https://www.coingecko.com/es/monedas/${cryptoId}`,
      imageURL,
      name,
    };

    await replyMessage(interaction, messageReply);
  },
};

async function replyMessage(interaction, messageReply) {
  const embed = new MessageEmbed()
    .setColor("#ff95b9")
    .setTitle(`${messageReply.title}`)
    .setDescription(`${messageReply.message}`)
    .setTimestamp(new Date())
    .setFooter({
      text: messageReply.name,
      iconURL: messageReply.imageURL,
    })
    .setURL(`${messageReply.url}`);
  // .setThumbnail("https://i.imgur.com/AfFp7pu.png");
  // .setImage("https://i.imgur.com/AfFp7pu.png");

  await interaction.reply({
    embeds: [embed],
  });
}
