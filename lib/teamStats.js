const { connectToDatabase } = require("./mongoUtils");
const fetch = require("node-fetch");

exports.hasDiscordId = async ({ discordId }) => {
  const { db } = await connectToDatabase();

  const trainers = await db.collection("trainers").findOne({ discordId });

  return trainers ? true : false;
};

exports.getRonin = async ({ discordId }) => {
  const { db } = await connectToDatabase();

  const trainers = await db.collection("trainers").findOne({ discordId });

  return trainers;
};

exports.getStatsByRonin = async (ronin) => {
  let response = await fetch(
    `https://game-api.axie.technology/api/v1/${ronin}`
  ).then((result) => result.json());

  return {
    cups: response.mmr,
    rank: response.rank,
    slp: response.in_game_slp,
  };
};

exports.bestTrainers = async (option) => {
  const { db } = await connectToDatabase();

  let orderBy = option === "rank" ? 1 : -1;

  const trainers = await db
    .collection("trainers")
    .find()
    .sort({ [option]: [orderBy] })
    .limit(5)
    .toArray();

  return trainers;
};
