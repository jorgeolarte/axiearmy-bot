//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
exports.pingCoinGecko = async () => {
  let data = await CoinGeckoClient.ping();
  return data.success;
};

exports.getCryptoPrice = async (category) => {
  let cryptoId = "";
  switch (category) {
    case "slp":
      cryptoId = "smooth-love-potion";
      break;
    case "axs":
      cryptoId = "axie-infinity";
      break;
    case "ron":
      cryptoId = "ronin";
      break;
    default:
      cryptoId = "smooth-love-potion";
      break;
  }

  let data = await CoinGeckoClient.simple.price({
    ids: [cryptoId],
    vs_currencies: ["usd"],
  });
  return data.data[cryptoId].usd;
};
