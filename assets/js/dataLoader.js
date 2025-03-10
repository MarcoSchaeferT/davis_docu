
function dataLoader() {
  // Load CSV file
  console.log("Loading data...");
  let cData = [];
  d3.csv("/davisDocu/assets/data.csv").then(function (data) {
    data.forEach(function (d) {
      console.log(d);
      cData.push(d);
    });
  });
  console.log("Loading finished");

  return cData;
}
