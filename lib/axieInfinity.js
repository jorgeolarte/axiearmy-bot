const fetch = require("node-fetch");

exports.getOverviewToday = async (option) => {
  let query =
    "query GetOverviewToday {\n  marketStats {\n    last24Hours {\n      ...OverviewFragment\n      __typename\n    }\n    last7Days {\n      ...OverviewFragment\n      __typename\n    }\n    last30Days {\n      ...OverviewFragment\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment OverviewFragment on SettlementStats {\n  count\n  axieCount\n  volume\n  volumeUsd\n  __typename\n}\n";

  let stats = await fetch("https://graphql-gateway.axieinfinity.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  })
    .then((result) => result.json())
    .then((data) => data.data.marketStats);

  return stats[option];
};
