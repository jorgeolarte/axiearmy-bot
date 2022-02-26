const fetch = require("node-fetch");

exports.hasDiscordId = async ({ discordId }) => {
  let trainer = await fetch(
    `https://www.axiearmy.club/api/trainers/discord/${discordId}`
  ).then((result) => result.json());

  return trainer ? true : false;
};

exports.getRonin = async ({ discordId }) => {
  let trainer = await fetch(
    `https://www.axiearmy.club/api/trainers/discord/${discordId}`
  ).then((result) => result.json());

  return trainer;
};

exports.getStatsByRonin = async (ronin) => {
  let trainer = await fetch(
    `https://www.axiearmy.club/api/trainers/${ronin}`
  ).then((result) => result.json());

  return {
    cups: trainer.cups,
    rank: trainer.rank,
    slp: trainer.slp,
  };
};

exports.bestTrainers = async (option) => {
  let orderBy = option === "rank" ? 1 : -1;

  let trainers = await fetch(
    `https://www.axiearmy.club/api/trainers/rank/${option}/5`
  ).then((result) => result.json());

  return trainers;
};
