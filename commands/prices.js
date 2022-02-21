const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { getCryptoPrice } = require("../lib/coingecko");

const CRYPTO_CONFIG = {
  "smooth-love-potion": "Smooth Love Potion",
  "axie-infinity": "Axie Infinity",
  ronin: "Ronin",
  ethereum: "Ethereum",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prices")
    .setDescription("Get cryptocurrencies prices!"),
  async execute(interaction) {
    let cryptos = await getCryptoPrice();

    let messageReply = {
      title: `Price of Axie Infinity's cryptocurrencies`,
      message: `There are the cryptocurrencies prices`,
      fields: [],
    };

    Object.entries(cryptos).map((crypto, key) => {
      let name = getCryptoName(crypto[0]);

      messageReply.fields.push({
        name: `${name}`,
        value: `${crypto[1].usd} USD`,
        inline: true,
      });
    });

    await replyMessage(interaction, messageReply);
  },
};

function getCryptoName(id) {
  return CRYPTO_CONFIG[id] || CRYPTO_CONFIG["smooth-love-potion"];
}

async function replyMessage(interaction, messageReply) {
  const embed = new MessageEmbed()
    .setColor("#ff95b9")
    .setTitle(`${messageReply.title}`)
    .setDescription(`${messageReply.message}`)
    .setTimestamp(new Date())
    .setFooter({
      text: "Prices by CoinGecko",
      iconURL:
        "https://res.cloudinary.com/axiearmy-club/image/upload/v1645452973/coin-gecko/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2_iukkap.png",
    })
    .addFields(messageReply.fields)
    .setThumbnail(
      "https://res.cloudinary.com/axiearmy-club/image/upload/v1645452973/coin-gecko/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2_iukkap.png"
    );

  await interaction.reply({
    embeds: [embed],
  });
}
