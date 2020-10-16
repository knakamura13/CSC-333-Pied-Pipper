import React, { useEffect, useState } from 'react'
import TopShip from './TopShip'
import BottomShip from './BottomShip'
import useKey from './UseKey'
import TopMissile from './TopMissile'
import BotMissile from './BotMissile'

function GameBoard(){

    const rightPressed = useKey("ArrowRight");
    const leftPressed = useKey("ArrowLeft");
    const firePressed = useKey("f");

    const [topDirection, setTopDirection] = useState('RIGHT'); 
    const [bottomDirection, setBottomDirection] = useState('LEFT'); 
    const [topMissileFire, setTopMissileFire] = useState(false);
    const [botMissileFire, setBotMissileFire] = useState(false);
    const [topHeadLoc, setTopHeadLoc] = useState([0,0]);
    const [botHeadLoc, setBotHeadLoc] = useState([0,0]);

    useEffect(() => {
        checkPressTop();
        checkPressBot();
    });

    const checkPressTop = () => {
        if (rightPressed){
            setTopDirection('RIGHT');
        }
        else if(leftPressed){
            setTopDirection('LEFT');
        }
        if (firePressed){
            setTopMissileFire(true);
        }
    }

    const checkPressBot = () => {
        if (rightPressed){
            setBottomDirection('RIGHT');
        }
        else if(leftPressed){
            setBottomDirection('LEFT');
        }
        if (firePressed){
            setBotMissileFire(true);
        }
    }

     // sets the top missile fire to false and ends the trigger
    const topFinishFire = () => {
        setTopMissileFire(false);
    }


    // sets the bottom missile fire to false and ends the trigger
    const botFinishFire = () => {
        setBotMissileFire(false);
    }

    const getTopHeadLoc = (currTopHeadLoc) => {
        setTopHeadLoc(currTopHeadLoc);
    }

    const getBotHeadLoc = (currBotHeadLoc) => {
        setBotHeadLoc(currBotHeadLoc);
    }

    return(
        <div className = "game-area">
                <BottomShip currDirection={bottomDirection} getBotHeadLoc={getBotHeadLoc}/>
                <BotMissile botMissileFire={botMissileFire} botFinishFire={botFinishFire} botHeadLoc={botHeadLoc}/>
                <TopShip currDirection={topDirection} getTopHeadLoc={getTopHeadLoc}/>
                <TopMissile topMissileFire={topMissileFire} topFinishFire={topFinishFire} topHeadLoc={topHeadLoc}/>
        </div>
    )
}

export default GameBoard;
