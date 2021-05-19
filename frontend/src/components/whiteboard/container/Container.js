import React from 'react';
import Board from '../board/Board';
import { Card } from 'react-bootstrap';
import './style.css';

class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: "#000000",
            size: "5"
        }
    }

    changeColor(params) {
        this.setState({
            color: params.target.value
        })
    }

    changeSize(params) {
        this.setState({
            size: params.target.value
        })
    }

    render() {

        return (
            <div className="container">

                <Card>
                    <Card.Body>

                        <div class="tools-section">

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="color-picker-container">
                                        Select Brush Color : &nbsp;
                        <input type="color" value={this.state.color} onChange={this.changeColor.bind(this)} />
                                    </div>
                                </div>
                                <div className="col-md-4">

                                    <div className="eraser">
                                        Eraser
                        <input type="color" value="#ffffff" onClick={(e) => {
                                            e.preventDefault()
                                            this.setState({
                                                color: e.target.value
                                            })
                                        }} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="brushsize-container">
                                        Select Brush Size : &nbsp;
                        <select value={this.state.size} onChange={this.changeSize.bind(this)}>
                                            <option> 5 </option>
                                            <option> 10 </option>
                                            <option> 15 </option>
                                            <option> 20 </option>
                                            <option> 25 </option>
                                            <option> 30 </option>
                                        </select>
                                    </div>
                                </div>
                            </div>



                        </div>

                        <div class="board-container">
                            <Board color={this.state.color} size={this.state.size}></Board>
                        </div>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Container