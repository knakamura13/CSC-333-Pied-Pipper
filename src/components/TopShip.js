import React from 'react';

function TopShip(props){
    return(
        <div>
            {props.topShipLoc.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`
                }


                return(
                    <div className="dot" key={i} style={style}></div>
                )
            })}
        </div>
    )
}

export default TopShip;