
async function fetchGoogleSheet(sheetId, sheetGid) {
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${sheetGid}`;
  try {
    console.log("Fetching sheet data...");
    const response = await fetch(base);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the response text (the CSV data)
    const csvData = await response.text();


    // Parse the CSV into an array of objects
    const data = d3.csvParse(csvData);
    console.log("Parsed JSON");

    return data;



  } catch (error) {
    console.error("Error fetching sheet:", error);
  }


}
