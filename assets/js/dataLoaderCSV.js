
function dataLoaderCSV(dataPath) {
  // Load CSV file
  console.log("Loading vis. data...");
  let visData = [];
  d3.csv(dataPath).then(function (data) {
    data.forEach(function (d) {
      visData.push(d);
    });
  }).catch((error) => {
    console.error("Loading vis. data failed", error);
    throw error;
  });

  console.log("Loading vis. data finished");

  return visData;
}
