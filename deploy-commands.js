require("dotenv").config();

const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
  new SlashCommandBuilder()
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
  new SlashCommandBuilder()
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
  new SlashCommandBuilder().setName("my-stats").setDescription("Get my stats!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_CLIENT_ID,
      process.env.DISCORD_GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
