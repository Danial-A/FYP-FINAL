import axios from 'axios'


const KEY = process.env.GOOGLE_KEY

export default axios.create({
    baseURL : "http://www/googleapis.com/youtube/v3",
    params:{
        part:'snippet',
        maxResults: 10,
        key:KEY
    }
})