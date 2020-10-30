import React, {useEffect, useState} from 'react'
import TopShip from './TopShip'
import BottomShip from './BottomShip'
import useKey from './UseKey'
import TopMissile from './TopMissile'
import BotMissile from './BotMissile'

function GameBoard() {
    // returns true if the user is pressing a key (left arrow, right arrow, "f", etc.)
    const rightPressed = useKey("ArrowRight");
    const leftPressed = useKey("ArrowLeft");
    const firePressed = useKey("f");

    // state changes for the top ship/missile
    const [topDirection, setTopDirection] = useState('RIGHT');
    const [topMissileFire, setTopMissileFire] = useState(false);
    const [topHeadLoc, setTopHeadLoc] = useState([0, 0]);

    // state changes for the bottom ship/missile
    const [bottomDirection, setBottomDirection] = useState('LEFT');
    const [botMissileFire, setBotMissileFire] = useState(false);
    const [botHeadLoc, setBotHeadLoc] = useState([0, 0]);

    // when the user presses a key, checks the key they pressed and performs actions
    useEffect(() => {
        checkPressTop();
        checkPressBot();
    }, [rightPressed, leftPressed, firePressed]);

    // initiates triggers for firing or movement
    const checkPressTop = () => {
        if (rightPressed) {
            setTopDirection('RIGHT');
        } else if (leftPressed) {
            setTopDirection('LEFT');
        }
        if (firePressed) {
            setTopMissileFire(true);
        }
    }

    // sets the top missile fire to false and ends the trigger
    const topFinishFire = () => {
        setTopMissileFire(false);
    }

    // gets the location of the top ship's head for missile positioning
    const getTopHeadLoc = (currTopHeadLoc) => {
        setTopHeadLoc(currTopHeadLoc);
    }

    // initiates triggers for firing or movement
    const checkPressBot = () => {
        if (rightPressed) {
            setBottomDirection('RIGHT');
        } else if (leftPressed) {
            setBottomDirection('LEFT');
        }
        if (firePressed) {
            setBotMissileFire(true);
        }
    }

    // sets the bottom missile fire to false and ends the trigger
    const botFinishFire = () => {
        setBotMissileFire(false);
    }

    // gets the location of the bottom ship's head for missile positioning
    const getBotHeadLoc = (currBotHeadLoc) => {
        setBotHeadLoc(currBotHeadLoc);
    }

    // returns the game area to the calling component
    return (
        <div className="game-area">
            <BottomShip currDirection={bottomDirection} getBotHeadLoc={getBotHeadLoc}/>
            <BotMissile botMissileFire={botMissileFire} botFinishFire={botFinishFire} botHeadLoc={botHeadLoc}/>
            <TopShip currDirection={topDirection} getTopHeadLoc={getTopHeadLoc}/>
            <TopMissile topMissileFire={topMissileFire} topFinishFire={topFinishFire} topHeadLoc={topHeadLoc}/>
        </div>
    )
}

export default GameBoard;
