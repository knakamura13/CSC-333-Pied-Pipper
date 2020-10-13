import React, { useState } from 'react';
import { useEffect } from 'react';

function TopShip(props){

    const speed = 150;

    const shipBuild = [ [0,2], [8,2],
    [0,4], [2,4], [4,4], [6,4], [8,4],
    [2,6], [4,6], [6,6],
    // head is index 10
    [4,8]]

    const shipBuildRight = [ [90,2], [98,2],
    [90,4], [92,4], [94,4], [96,4], [98,4],
    [92,6], [94,6], [96,6],
    // head is index 10
    [94,8]]

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

    const getTopHeadLoc = (currHeadLoc) => {
        props.getTopHeadLoc(currHeadLoc);
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
                location = shipBuild;
                break;
            case 'STUCKRIGHT':
                location = shipBuildRight;
                break;
        }

        setShipLoc(location);
        getTopHeadLoc([shipLoc[10][0], shipLoc[10][1]]);
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

export default TopShip;