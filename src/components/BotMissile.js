import React, { useState } from 'react'
import { useEffect } from 'react'

function BotMissile(props){

    const [missileOpacity, setMissileOpacity] = useState(0);
    const [mLocation, setMLocation] = useState([50,20]);
    const [moving, setMoving] = useState(false);


    useEffect(() => {
        checkFire();

        const interval = setInterval(() => {
            moveMissile();
            checkEndFire();
        }, 50);
        return () => clearInterval(interval);

    },);

    const checkFire = () => {
        // if user has selected the space bar
        if (props.botMissileFire === true){
            setMoving(true);
            
            if(moving){
                setMissileOpacity(1);
                fireMissile();
            }
        }
    }

    // calls the parent to set botMissileFire to false 
    const botFinishFire = () => {
        props.botFinishFire();
    }

    // activates when user hits the "f" key
    const fireMissile = () => {

        // sets the parent variable that trigger the fire to false
        botFinishFire(); 

        // sets initialLoc to the coordinates of the ship's head
        let initialLoc = [props.botHeadLoc[0], props.botHeadLoc[1] + 2]

        // sets the missile location to the current head of the ship
        setMLocation(initialLoc);

        // makes the missile visible to the user
        setMissileOpacity(1);
    }

    const checkEndFire = () => {
        if (mLocation[1] < 4){
            setMissileOpacity(0);
            setMLocation([0,0]);
            setMoving(false);
        }
    }

    const moveMissile = () => {
        if (moving){
            let location = {...mLocation}
            location = [location[0], location[1]-2]
            setMLocation(location);
        }
    }

    return(
        <div>
            {mLocation.map((dot, i)=>{const style = {
            opacity: `${missileOpacity}`,
            left: `${mLocation[0]}%`,
            top: `${mLocation[1]}%`
        }
        return (<div className="missile" key={i} style={style}></div>)
        })}  
        </div>
    )
}

export default BotMissile