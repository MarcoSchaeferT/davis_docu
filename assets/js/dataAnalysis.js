function analyzeData(data) {
  const entries = [];

  let countryData = {};

  function iterateJson(input, visitor) {
    if (!input || typeof input !== 'object') return;
    Object.values(input).forEach(value => {
      if (value && typeof value === 'object')
        if (value.Type == 1 && value.Country) {
          const key = String(value.Country).trim().replace(/^["']+|["']+$/g, '');
          if (key) {
            countryData[key] = (countryData[key] || 0) + 1;
          }
        }


    });
  }
  iterateJson(data, entries.push.bind(entries));

  return countryData;
}