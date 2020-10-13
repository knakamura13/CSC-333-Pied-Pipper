import React from 'react';

function Ship(props){
    return(
        <div>
            {props.shipLoc.map((dot, i) => {
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

export default Ship;