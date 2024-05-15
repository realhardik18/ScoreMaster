import { useState } from "react";

function ScoreCard(){
    const [score,setscore]=useState(0); 
    const [balls,setsovers]=useState(0);
    var decimal=balls%6
    const overs=`${Math.floor(balls/6)}.${decimal}`
    const add=(runs)=>{
        setscore(score+runs)
    };
    return(
        <div className="text-center">
            <p>Batsmen A :- {score} off {overs}</p>
        <div className="join">
            <button className="join-item btn border-white" onClick={()=>add(1)}>WD</button>
            <button className="join-item btn border-white" onClick={()=>{add(1); setsovers(balls+1)}}>1</button>
            <button className="join-item btn border-white" onClick={()=>{add(2); setsovers(balls+1)}}>2</button>
            <button className="join-item btn border-white" onClick={()=>{add(3); setsovers(balls+1)}}>3</button>            
        </div><br />
        <div className="join">
            <button className="join-item btn border-white" onClick={()=>{add(4); setsovers(balls+1)}}>4</button>
            <button className="join-item btn border-white" onClick={()=>{add(6); setsovers(balls+1)}}>6</button>
            <button className="join-item btn border-white" onClick={()=>setsovers(balls+1)}>W</button>
            <button className="join-item btn border-white" onClick={()=>add(1)}>NB</button>
        </div>
        <div className="p-1">
            <button className="btn btn-secondary" onClick={()=>{add(score*-1); setsovers(balls-balls)}}>Reset</button>
        </div>
        </div>

    );
}

export default ScoreCard