import React, {useEffect, useState} from 'react'

// React Hook for the missile for the bottom ship
function BotMissile(props) {
    // note that smaller values are faster
    const missileSpeed = 50;

    // states for the bottom missile
    const [missileOpacity, setMissileOpacity] = useState(0);
    const [mLocation, setMLocation] = useState([50, 20]);
    const [moving, setMoving] = useState(false);

    // continues to check to see if the user has pressed any keys
    useEffect(() => {
        checkFire();

        // moves the missile at an interval defined by the speed
        // and terminates the firing process
        const interval = setInterval(() => {
            moveMissile();
            checkEndFire();
        }, missileSpeed);

        return () => clearInterval(interval);
    });

    // when user selects the "f" key, sets missile visible and begins movement
    const checkFire = () => {
        // if user has selected the "f" key
        if (props.botMissileFire === true) {

            // sets the missile's status to "moving"
            setMoving(true);

            // makes the missile visible
            setMissileOpacity(1);

            // calls the function to fire missile
            fireMissile();
        }
    }

    // calls the parent to set botMissileFire to false 
    const botFinishFire = () => {
        props.botFinishFire();
    }

    // in a sequence of functions activated when user hits the "f" key
    const fireMissile = () => {

        // sets the parent variable that trigger the fire to false
        botFinishFire();

        // sets initialLoc to the coordinates of the ship's head
        let initialLoc = [props.botHeadLoc[0], props.botHeadLoc[1] + 2]

        // sets the missile location to the current head of the ship
        setMLocation(initialLoc);
    }

    // checks the condition for ending fire
    const checkEndFire = () => {

        // if the missile has reached the end of the gameboard
        if (mLocation[1] < 4) {
            // set missile invisible, set moving to false
            setMissileOpacity(0);
            setMLocation([0, 0]);
            setMoving(false);
        }
    }

    // changes the position of the missile if "moving" is true
    const moveMissile = () => {
        if (moving) {
            let location = {...mLocation}
            location = [location[0], location[1] - 2]
            setMLocation(location);
        }
    }

    // returns the missile component to the component that calls it
    return (
        <div>
            {mLocation.map((dot, i) => {
                const style = {
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