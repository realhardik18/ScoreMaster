import React, { useState } from "react";

function Scorecard(){
    const [score,runs]=useState(0);
    const [balls,faced]=useState(0);
    return(
        <div>
            <h1>{score} off {balls}</h1>
            <button className="btn btn-active btn-accent" onClick={()=>{runs(score + 1); faced(balls+1)}}>single</button>
            <button className="btn btn-active btn-accent" onClick={()=>{runs(score + 2); faced(balls+1)}}>double</button>
            <button className="btn btn-active btn-accent" onClick={()=>{runs(score + 3); faced(balls+1)}}>triple</button>
            <button className="btn btn-active btn-accent" onClick={()=>{runs(score + 4); faced(balls+1)}}>four</button>
            <button className="btn btn-active btn-accent" onClick={()=>{runs(score + 6); faced(balls+1)}}>six</button>
        </div>
    );
}

export default Scorecard