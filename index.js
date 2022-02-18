require("dotenv").config();

const fs = require("fs");
const {
  Client,
  Collection,
  Intents,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { getCryptoPrice } = require("./lib/coingecko");
const { getOverviewToday } = require("./lib/graphQL");
const { hasDiscordId, getRonin, getStatsByRonin } = require("./lib/axieStats");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  // if (commandName === "ping") {
  //   await interaction.reply("Pong!");
  // } else if (commandName === "server") {
  //   await interaction.reply(
  //     `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
  //   );
  // } else if (commandName === "user") {
  //   await interaction.reply(
  //     `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
  //   );
  // }

  if (commandName === "marketplace") {
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
  } else if (commandName === "price") {
    let option = interaction.options.getString("category");
    let cryptoPrice = await getCryptoPrice(option);
    await interaction.reply(
      `El precio del ${option.toUpperCase()} es: **${cryptoPrice} USD**`
    );
  } else if (commandName === "my-stats") {
    if (interaction.member.roles.cache.has("944245904142114916")) {
      if (
        await hasDiscordId({
          discordId: interaction.user.id,
        })
      ) {
        let trainer = await getRonin({ discordId: interaction.user.id });

        let stats = await getStatsByRonin(trainer.ronin);

        const embed = new MessageEmbed()
          .setColor("#ff95b9")
          .setTitle(`${trainer.name} | ${trainer.team}`)
          .setDescription(
            `These are your stats :sunglasses: \n\n :military_medal: **Rank:** ${stats.rank} \n :trophy: **Cups:** ${stats.cups} \n :dollar: **SLP:** ${stats.slp}`
          );

        await interaction.reply({
          ephemeral: true,
          embeds: [embed],
        });
      } else {
        await interaction.reply({
          content: `No estas configurado`,
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: `No tienes permisos`,
        ephemeral: true,
      });
    }
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
