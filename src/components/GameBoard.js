import React, { useEffect, useState } from 'react'
import Ship from '../components/Ship'
import useKey from '../components/UseKey'

function GameBoard(){

    const rightPressed = useKey('ArrowRight');
    const leftPressed = useKey('ArrowLeft');
    const [topDirection, setTopDirection] = useState('RIGHT'); 

    useEffect(() => {
        checkPress();
    });

    const checkPress = () => {
        if (rightPressed){
            setTopDirection('RIGHT');
        }
        else if(leftPressed){
            setTopDirection('LEFT')
        }
    }

    return(
        <div className = "game-area">
                <Ship currDirection={topDirection}/>
        </div>
    )

    /* seems necessary
    {rightPressed && (<>
        <div>Alan</div>
    </>
    )}*/
}

export default GameBoard;
