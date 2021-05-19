import React from 'react'
import SearchComponent from '../components/YT-Data/Search'
import YTPage from '../components/YT-Data/YT-Data-API-Result'
import NavigationBar from '../components/navigation-bar/userNavbar'
import YoutubeApi from '../components/YT-Data/Api'



function YoutubeSearchPage(props) {

 
    const onSearch = async (keyword) =>{
        const response = await YoutubeApi.get("/search",{
            params:{
                q:keyword
            }
        })
        console.log(response)
        
    }
    console.log(props.match)
    return (
        <div>
            <NavigationBar/>
            <SearchComponent onSearch = {onSearch}/>
            <YTPage location = {props.match}/>
        </div>
    )
}

export default YoutubeSearchPage
