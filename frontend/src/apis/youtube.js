import axios from 'axios';
const KEY = 'AIzaSyAhd22R6lu3w3kCYB6mzJyNgNs59Nnj24s';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: KEY
    }
})