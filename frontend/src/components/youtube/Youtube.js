import React from 'react';
import SearchBar from './Searchbar';
import youtube from '../../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import NavigationBar from '../navigation-bar/userNavbar'
import Footer from '../footer-section/footer'
import 'bootstrap/dist/css/bootstrap.min.css'


class Youtube extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
        nextPage: '',
        searchTerm:'',
        prevPage: ''
    }
    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items,
            nextPage:response.data.nextPageToken,
            searchTerm:termFromSearchBar
        })
        console.log("this is resp",response);
    };
    handleVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }

    handleNextPage = async () =>{
        const response = await youtube.get('/search', {
            params: {
                q: this.state.searchTerm,
                pageToken:this.state.nextPage
            }
        })
        this.setState({
            videos: response.data.items,
            nextPage:response.data.nextPageToken,
            prevPage:response.data.prevPageToken
        })
        console.log("Next page response: ",response)
    }

    handlePrevPage =async () =>{
        const response = await youtube.get('/search', {
            params: {
                q: this.state.searchTerm,
                pageToken:this.state.prevPage
            }
        })
        this.setState({
            videos: response.data.items,
            nextPage:response.data.nextPageToken,
            prevPage:response.data.prevPageToken
        })
        console.log("Previous response: ",response)
    }
    
    render() {
        return (
            <div>
            <NavigationBar/>
                <div className='ui container' style={{marginTop: '1em'}}>
                    <SearchBar handleFormSubmit={this.handleSubmit}/>
                    <div className='ui grid'>
                    <div className="row">
                                <div className="col">
                                    <VideoDetail video={this.state.selectedVideo}/>
                                </div>
                            </div>
                        <div className="ui row">
                            <div className="col" style = {{marginBottom:"10vh"}}>
                                <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                                <div className="row">
                                {this.state.videos.length > 0 ? <button className = "btn btn-danger mr-4" onClick = {()=> this.handlePrevPage()}>Previous Page</button> : null}
                                {this.state.videos.length > 0 ? <button className = "btn btn-danger" onClick = {()=> this.handleNextPage()}>Next Page</button> : null}
                                </div>
                            </div>
                            </div>         
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Youtube;