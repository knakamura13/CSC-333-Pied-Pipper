import React, { useState } from 'react';
import { useEffect } from 'react';

function BottomShip(props){

    const speed = 150;

    const shipBuild = [
    [90,96], [98,96],
    [90,94], [92,94], [94,94],
    [96,94], [98,94], [92,92], [94,92], [96,92], [94,90]]

    const shipBuildLeft = [ [0,96], [8,96],
    [0,94], [2,94], [4,94], [6,94], [8,94],
    [2,92], [4,92], [6,92],
    [4,90]]

    const [shipLoc, setShipLoc] = useState(shipBuild);
    const [shipDirection, setDirection] = useState(props.currDirection);
    const [active, setActive] = useState(true);
    const [stuckLocation, setStuckLoc] = useState('INIT');

    useEffect(() => {
        setNewDirection();

        const interval = setInterval(() => {
            moveShip();
        }, speed);
        return () => clearInterval(interval);

    },);

    const checkBounds = () => {
        if (shipLoc[0][0] <= 4) {
            setActive(false);    
            setStuckLoc('LEFT');
            setDirection('STUCKLEFT');
        }
        else if(shipLoc[1][0] >= 94){
            setActive(false);    
            setStuckLoc('RIGHT');
            setDirection('STUCKRIGHT');
        }
        else{
            setActive(true);
            setStuckLoc('INIT');
        }
    }

    const getBotHeadLoc = (currBotHeadLoc) => {
        props.getBotHeadLoc(currBotHeadLoc);
    }

    const setNewDirection = () => {
        if (active) {
            setDirection(props.currDirection);
        }
        else if (props.currDirection !== stuckLocation){
            setActive(true);
        }
    }

    const shiftRight = ([x,y]) => {
        return([x+2, y]);
    }

    const shiftLeft = ([x,y]) => {
        return([x-2, y]);
    }

    const moveShip = () => {
        let location;

        switch (shipDirection){
            case 'RIGHT':
                location = shipLoc.map(shiftRight)
                break;
            case 'LEFT':
                location = shipLoc.map(shiftLeft)
                break;
            case 'STUCKLEFT':
                location = shipBuildLeft;
                break;
            case 'STUCKRIGHT':
                location = shipBuild;
                break;
        }

        setShipLoc(location);
        getBotHeadLoc([shipLoc[10][0], shipLoc[10][1]]);
        checkBounds();
    }

    return(
    <div>
        {shipLoc.map((dot, i)=>{
            const style = {
                left: `${dot[0]}%`,
                top: `${dot[1]}%`
            }

            return(
                <div className="pixel" key={i} style={style}></div>
            )
        })}
    </div>
    )
}

export default BottomShip;