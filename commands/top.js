const { SlashCommandBuilder } = require("@discordjs/builders");
const { bestTrainers } = require("../lib/teamStats");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Who are our best trainers!")
    .addStringOption(
      (option) =>
        option
          .setName("option")
          .setDescription("Select an option!")
          .setRequired(true)
          .addChoice("by world rank", "rank")
          .addChoice("by cups", "cups")
      // .addChoice("by SLP", "slp")
    ),
  async execute(interaction) {
    let option = interaction.options.getString("option");

    let trainers = await bestTrainers(option);

    let message = "";

    message = `Los mejores entrenadores por ${option.toUpperCase()} \n\n`;

    trainers.map((trainer, index) => {
      message += index === 0 ? `>>> ` : ``;
      message += `**${index + 1}.** `;
      message += `${trainer.name} | ${trainer.team} | ${trainer[option]}`;
      message += index === 0 ? ` :trophy: \n` : `\n`;
    });

    await interaction.reply({
      content: `${message}`,
      ephemeral: true,
    });
  },
};
