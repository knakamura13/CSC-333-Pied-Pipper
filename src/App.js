import React, { Component } from 'react';
import Ship from './components/Ship';
import Missile from './components/Missile';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

const initialState = {
  missileOpacity: 0,
  missileLoc: [8,12],
  speed: 350,
  direction: 'RIGHT',
  // coordinates of each pixel, [x,y]
  topShipLoc: [
    [0,2], [8,2],
    [0,4], [2,4], [4,4], [6,4], [8,4],
    [2,6], [4,6], [6,6],
    // head is index 10
    [4,8]
  ]

  // bottomShipLoc: [
  //   [4,90],
  //   [2,92], [4, 92], [6, 92],
  //   [0,94], [2, 94], [4, 94], [6, 94], [8, 94],
  //   [0,96], [8,96]
  // ]

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

  fire = () => {
    let location = [this.state.topShipLoc[10][0], this.state.topShipLoc[10][1] + 2];
    this.setState({missileLoc: location, missileOpacity: 1});
    setInterval(this.fireMissile, 100)
  }

  fireMissile = () => {
    let location = {...this.state.missileLoc}
    location[1] = location[1] + 2;
    this.setState({missileLoc: location});
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
      case 32:
        this.fire();
        break;
    }

  }

  shiftRight = ([x,y]) => {
    return([x+2, y]);
  }

  shiftLeft = ([x,y]) => {
    return([x-2, y]);
  }

  shiftDown = (y) => {
    return(y);
  }

  shiftUp = ([x,y]) => {
    return([x, y-2]);
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
     
    // foo, missile just resets to 0,0. should disappear entirely
    if (this.state.missileLoc[1] > 98){
      this.setState({missileLoc: [0,0], missileOpacity: 0});
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
      <Ship shipLoc = {this.state.topShipLoc}/>
      <Missile missileLocation={this.state.missileLoc} opacity={this.state.missileOpacity} />
    </div>
  )}
}

export default App;
