import { useState } from "react";
import { hello } from "./scorecard.js"

function Scorecard(){
    const [score,runs]=useState(0);
    const [balls,faced]=useState(0);
    var decmial = balls%6
    var overs= `${Math.floor(balls/6)}.${decmial}`
    return(
        <div>
            <h1>{score} off {overs}</h1>
            <button className="btn btn-active btn-accent" onClick={hello}>say hi</button>
            <button className="btn btn-active btn-accent" onClick={()=>{runs(score + 1); faced(balls+1)}}>single</button>
            <button className="btn btn-active btn-accent" onClick={()=>{runs(score + 2); faced(balls+1)}}>double</button>
            <button className="btn btn-active btn-accent" onClick={()=>{runs(score + 3); faced(balls+1)}}>triple</button>
            <button className="btn btn-active btn-accent" onClick={()=>{runs(score + 4); faced(balls+1)}}>four</button>
            <button className="btn btn-active btn-accent" onClick={()=>{runs(score + 6); faced(balls+1)}}>six</button>
        </div>
    );
}

export default Scorecard