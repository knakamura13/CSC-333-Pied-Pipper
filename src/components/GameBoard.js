import React, { useEffect, useState } from 'react'
import TopShip from './TopShip'
import BottomShip from './BottomShip'
import useKey from '../components/UseKey'
import TopMissile from '../components/TopMissile'
import BotMissile from '../components/BotMissile'

function GameBoard(){

    const rightPressed = useKey("ArrowRight");
    const leftPressed = useKey("ArrowLeft");
    const spacePressed = useKey("f");
    const [topDirection, setTopDirection] = useState('RIGHT'); 
    const [bottomDirection, setBottomDirection] = useState('LEFT'); 
    const [topMissileFire, setTopMissileFire] = useState(false);
    const [botMissileFire, setBotMissileFire] = useState(false);
    const [topHeadLoc, setTopHeadLoc] = useState([0,0]);
    const [botHeadLoc, setBotHeadLoc] = useState([0,0]);

    useEffect(() => {
        checkPressTop();
        // checkPressBot();
    });

    const checkPressTop = () => {
        if (rightPressed){
            setTopDirection('RIGHT');
        }
        else if(leftPressed){
            setTopDirection('LEFT');
        }
        if (spacePressed){
            setTopMissileFire(true);
        }
    }

    // const checkPressBot = () => {
    //     if (rightPressed){
    //         setBottomDirection('RIGHT');
    //     }
    //     else if(leftPressed){
    //         setBottomDirection('LEFT');
    //     }
    //     if (spacePressed){
    //         setBotMissileFire(true);
    //     }
    // }

     // sets the top missile fire to false and ends the trigger
    const topFinishFire = () => {
        setTopMissileFire(false);
    }


    // sets the bottom missile fire to false and ends the trigger
    const botFinishFire = () => {
        setBotMissileFire(false);
    }

    const getTopHeadLoc = (currHeadLoc) => {
        setTopHeadLoc(currHeadLoc);
    }

    const getBotHeadLoc = (currHeadLoc) => {
        setBotHeadLoc(currHeadLoc);
    }

    return(
        <div className = "game-area">
                <TopShip currDirection={topDirection} getTopHeadLoc={getTopHeadLoc}/>
                <TopMissile topFireMissile={topMissileFire} topFinishFire={topFinishFire} topHeadLoc={topHeadLoc}/>
                <BottomShip currDirection={bottomDirection} getBotHeadLoc={getBotHeadLoc}/>
                <BotMissile botFireMissile={botMissileFire} botFinishFire={botFinishFire} botHeadLoc={botHeadLoc}/>
        </div>
    )

    /* seems necessary
    {rightPressed && (<>
        <div>Alan</div>
    </>
    )}*/
}

export default GameBoard;
