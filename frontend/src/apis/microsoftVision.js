var axios = require('axios')
var options = {
  method: 'POST',
  url: 'https://microsoft-computer-vision3.p.rapidapi.com/ocr',
  params: {detectOrientation: 'true', language: 'unk'},
  headers: {
    'content-type': 'application/json',
    'x-rapidapi-key': '00cf44ed02msh226db00108cdb04p115abajsn7349f0a7aaad',
    'x-rapidapi-host': 'microsoft-computer-vision3.p.rapidapi.com'
  },
  data: {url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/HTML_source_code_example.svg/315px-HTML_source_code_example.svg.png'}
};

axios.request(options).then(function (response) {
	console.log(response.data.regions[0].lines);
}).catch(function (error) {
	console.error(error);
});