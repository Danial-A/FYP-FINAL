import React from 'react';
import './style/video.css'
import 'bootstrap/dist/css/bootstrap.min.css'
class Searchbar extends React.Component {
    handleChange = (event) => {
        this.setState({
            term: event.target.value
        });
    
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term);
    }

    render() {
        
        return (
            <>
            
            <div className='search-bar ui segment'>
                <form onSubmit={this.handleSubmit} className='ui form'>
                    <div className='field'>
                        <label htmlFor="video-search" style  ={{color:"crimson",fontSize:"30px", fontWeight:'bold'}} className = "mb-3">Youtube Video Search</label>
                        <input onChange={this.handleChange} name='video-search' type="text" placeholder="Search.." className  ="input-group video-search"/>
                    </div>
                </form>
            </div>
            </>
        )
    }
}
export default Searchbar;