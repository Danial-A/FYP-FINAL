var CloudmersiveOcrApiClient = require('cloudmersive-ocr-api-client');
var defaultClient = CloudmersiveOcrApiClient.ApiClient.instance;
const fs = require('fs')
// Configure API key authorization: Apikey
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = "9fa4e7ac-e8d7-4297-9203-359f6e686444"
 
var api = new CloudmersiveOcrApiClient.ImageOcrApi()
 
var imageFile = fs.readFileSync("C:\\Users\\DANIYAL\\Desktop\\code.png"); // {File} Image file to perform OCR on.  Common file formats such as PNG, JPEG are supported.
 
 
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.imageOcrPost(Buffer.from(pageBytes.buffer), callback);
 