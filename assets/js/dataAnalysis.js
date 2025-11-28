function analyzeData(data) {
  const entries = [];

  let countryData = {};

  function iterateJson(input, visitor) {
    console.log("Analyzing data...", input);
    if (typeof input !== 'object') {
      if (Array.isArray(input)) {
        input.forEach(item => iterateJson(item, visitor));
      }
      return;
    }
    Object.values(input).forEach(value => {
      number = value.Type ? Number(value.Type) : value.Count ? Number(value.Count) : 0;
      if (value && typeof value === 'object')
        if (number >= 1 && value.Country) {
          const key = String(value.Country).trim().replace(/^["']+|["']+$/g, '');
          if (key) {
            countryData[key] = (countryData[key] || 0) + number;
          }
        }


    });
  }
  iterateJson(data, entries.push.bind(entries));

  return countryData;
}