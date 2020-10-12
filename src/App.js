import React, { Component } from 'react';
import TopShip from './components/TopShip';

const initialState = {
  speed: 350,
  direction: 'RIGHT',
  // coordinates of each pixel, [x,y]
  topShipLoc: [
    [0,2], [8,2],
    [0,4], [2,4], [4,4], [6,4], [8,4],
    [2,6], [4,6], [6,6], [4,8]
  ]
}

class App extends Component {

  state = initialState

  componentDidMount(){
    setInterval(this.moveTopShip, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate()
  {
    this.checkBounds();
  }

  onKeyDown = (e) => {
    e = e || window.event;

    switch (e.keyCode){
      case 37:
        this.setState({direction: 'LEFT'})
        break;
      case 39:
        this.setState({direction: 'RIGHT'})
        break;
    }

  }

  shiftRight = ([x,y]) => {
    return([x+2, y]);
  }

  shiftLeft = ([x,y]) => {
    return([x-2, y]);
  }

  checkBounds(){
    if (this.state.topShipLoc[1][0] >= 98 || this.state.topShipLoc[0][0] <= 0){
      if(this.state.direction == 'LEFT'){
        this.state.direction = 'RIGHT';
      }
      else{
        this.state.direction = 'LEFT';
      }
    }
  }

  moveTopShip = () => {
    
    let location;

    switch (this.state.direction){
      case 'RIGHT':
        location = this.state.topShipLoc.map(this.shiftRight);
        break;
      case 'LEFT':
        location = this.state.topShipLoc.map(this.shiftLeft);
        break;
    }

    this.setState(
      {topShipLoc: location}
    )
  }

  render(){
    return(
    <div className='game-board'>
      <TopShip topShipLoc = {this.state.topShipLoc}/>
    </div>
  )}
}

export default App;
