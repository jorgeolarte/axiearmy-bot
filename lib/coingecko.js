//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

const CURRENCY_CONFIG = {
  slp: {
    id: "smooth-love-potion",
    name: "Smooth Love Potion",
    imageURL: "https://assets.coingecko.com/coins/images/10366/small/SLP.png",
  },
  axs: {
    id: "axie-infinity",
    name: "Axie Infinity",
    imageURL:
      "https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png",
  },
  ron: {
    id: "ronin",
    name: "Ronin",
    imageURL:
      "https://assets.coingecko.com/coins/images/20009/small/logo_round_light.jpeg",
  },
  eth: {
    id: "ethereum",
    name: "Ethereum",
    imageURL:
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
};

//3. Make calls
exports.pingCoinGecko = async () => {
  let data = await CoinGeckoClient.ping();
  return data.success;
};

exports.getCryptoPrice = async (currency) => {
  const cryptoConfig = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG["slp"];

  let data = await CoinGeckoClient.simple.price({
    ids: [cryptoConfig.id],
    vs_currencies: ["usd"],
  });

  return {
    cryptoId: cryptoConfig.id,
    name: cryptoConfig.name,
    price: data.data[cryptoConfig.id].usd,
    imageURL: cryptoConfig.imageURL,
  };
};
