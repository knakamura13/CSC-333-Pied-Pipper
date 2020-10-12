import React from 'react'

function Missile(props){
    const style = {
        left: `${props.missileLocation[0]}%`,
        top: `${props.missileLocation[1]}%`
    }

    return(
        <div className="Missile" style={style}></div>
    )
}

export default Missile;