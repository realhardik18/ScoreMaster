import { useState } from "react";

function ScoreCard(){
    const [score,setscore]=useState(0); 
    const add=(runs)=>{
        setscore(score+runs)
    };
    return(
        <div className="text-center">
            <p>Batsmen A :-{score}</p>
        <div className="join">
            <button className="join-item btn border-white" onClick={()=>add(1)}>WD</button>
            <button className="join-item btn border-white" onClick={()=>add(1)}>1</button>
            <button className="join-item btn border-white" onClick={()=>add(2)}>2</button>
            <button className="join-item btn border-white" onClick={()=>add(4)}>3</button>            
        </div><br />
        <div className="join">
            <button className="join-item btn border-white" onClick={()=>add(4)}>4</button>
            <button className="join-item btn border-white" onClick={()=>add(6)}>6</button>
            <button className="join-item btn border-white" onClick={()=>add(0)}>W</button>
            <button className="join-item btn border-white" onClick={()=>add(0)}>NB</button>
        </div>        
        </div>

    );
}

export default ScoreCard