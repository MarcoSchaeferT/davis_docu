
function dataLoaderCSV(dataPath) {
  // Load CSV file
  console.log("Loading vis. data...");
  return d3.csv(dataPath)
    .then(function (data) {
      const visData = data.map(function (d) {
        return JSON.parse(JSON.stringify(d));
      });
      console.log("Loading vis. data finished");
      return visData;
    })
    .catch((error) => {
      console.error("Loading vis. data failed", error);
      throw error;
    });
}
