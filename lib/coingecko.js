//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
exports.pingCoinGecko = async () => {
  let data = await CoinGeckoClient.ping();
  return data.success;
};

exports.getCryptoPrice = async (currency) => {
  let data = await CoinGeckoClient.simple.price({
    ids: ["smooth-love-potion", "axie-infinity", "ronin", "ethereum"],
    vs_currencies: ["usd"],
  });

  return data.data;
};
