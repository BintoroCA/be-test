const express = require("express");
const app = express();
const PORT = 5005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let coin = [10, 5, 2, 3, 6, 7];
  let cost = 0.5;
  let price = 23;

  let sortedCoin = coin.sort((a, b) => b - a); //sort from big to small to easier get minimum cost
  let resultCoinPair = []; //to save the result from each loop
  let resultCost = []; // to save the Cost from each loop
  let remainingCoin = []; //to track coin needed to match the needed price

  for (i = 0; i < sortedCoin.length; i++) {
    let currCoin = coin[i];

    let diff = price - currCoin + cost;
    resultCoinPair.push([currCoin]);
    resultCost.push([cost]);

    if (diff > 0) {
      remainingCoin.push([diff]);
      resultCoinPair[i].push(coin[i + 1]);
      resultCost[i].push(cost);

      let diff2 = remainingCoin[i][0] - coin[i + 1] + cost;

      if (diff2 > 0) {
        remainingCoin[i].push(diff2);
        resultCoinPair[i].push(coin[i + 2]);
        resultCost[i].push(cost);
        let diff3 = remainingCoin[i][1] - coin[i + 2] + cost;

        if (diff3 > 0) {
          remainingCoin[i].push(diff3);
          resultCoinPair[i].push(coin[i + 3]);
          resultCost[i].push(cost);
          let diff4 = remainingCoin[i][2] - coin[i + 3] + cost;

          if (diff4 > 0) {
            remainingCoin[i].push(diff4);
            resultCoinPair[i].push(coin[i + 4]);
            resultCost[i].push(cost);
          }
        }
      }
    }
  }
  let lastCalculation = remainingCoin[0];
  let coinNeeded = resultCoinPair[0];
  let totalCost = resultCost[0].reduce((acc, curr) => acc + curr);
  let coinLeft = coin.filter((coin) => {
    return !coinNeeded.includes(coin);
  });
  let coinPartlyUsed =
    coinNeeded[coinNeeded.length - 1] -
    Math.ceil(lastCalculation[lastCalculation.length - 1]);
  coinLeft.unshift(coinPartlyUsed);

  res.send({
    message: {
      "Coin yang diperlukan": coinNeeded,
      Biaya: totalCost,
      "Sisa coin": coinLeft,
    },
  });
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
