function MainScore(props){
    return(
        <div className="text-center">            
            <h1>{props.team1} vs {props.team2}</h1>
        </div>
    );
}
MainScore.defaultProps = {    
    team1:"Team A",
    team2:"Team B"
  }
export default MainScore