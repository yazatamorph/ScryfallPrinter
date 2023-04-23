const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");
const _ = require("lodash");
const axios = require("axios");

const input = process.argv[2] || false;

async function main(arg) {
  if (!arg) {
    return new Error("Need to input a set code");
  }

  const apiData = await getSetInfo(arg);
  const orderedData = orderSet(apiData);
  const arrColNumName = refineSet(orderedData);
  writeToFile(arrColNumName, arg);
}

async function getSetInfo(setCode) {
  let res = await axios.get(
    `https://api.scryfall.com/cards/search?q=s%3A${setCode}`
  );

  if (res?.data?.object !== "list") {
    return new Error("Did not receive expected results from Scryfall API");
  }

  if (!res?.data.data) {
    return new Error("Result set from Scryfall API is empty");
  }

  const resultArr = res.data.data;

  while (res.data.has_more) {
    res = await axios.get(res.data.next_page);
    resultArr.push(...res.data.data);
  }

  return resultArr;
}

function orderSet(setData) {
  return _.sortBy(setData, [
    function (o) {
      return ~~o.collector_number;
    },
  ]);
}

function refineSet(setData) {
  const arr = _.map(setData, function (o) {
    return `- [ ] ${o.collector_number} ${o.name}\n`;
  });
  return arr;
}

function writeToFile(textArr, setCode) {
  const outputDir = "./output";
  const outputFile = path.join(__dirname, `./output/${setCode}.md`);

  // Add title line to array
  textArr.unshift(`# ${setCode.toUpperCase()}\n\n`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const readStream = Readable.from(textArr);
  const writeStream = fs.createWriteStream(outputFile);

  readStream.pipe(writeStream);
  writeStream.on("finish", () =>
    console.log(`Done! Check ${outputDir}/${setCode}.md for your list.`)
  );
}

main(input);
