
function dataLoaderGeoJSON(dataPath) {
  console.log("Loading data GEO JSON...");
  const url = dataPath;
  return d3.json(url)
    .then((data) => {
      console.log("Loading GEO JSON finished");
      return data;
    })
    .catch((error) => {
      console.error("Loading GEO JSON failed", error);
      throw error;
    });
}
