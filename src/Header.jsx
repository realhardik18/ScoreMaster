function Header(props){
    return(
        <div className="navbar bg-green-500 text-primary-content">
            <button className="btn btn-ghost text-xl">ScoreMaster</button>
            <div className="ml-auto">
                <p>logged in as {props.name}</p>
            </div>
        </div>
    );
}
Header.defaultProps = {    
    name:"Guest"
  }
export default Header