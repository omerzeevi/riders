import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
        <div className="container">
            <Link to="/" className="navbar-brand"> 
            <i className="fas fa-snowboarding"></i> ISRiders
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse"> 
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                        <NavLink to="/myCards" className="nav-link"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "black"
                        }}
                        >
                        מועדפים
                        </NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink to="/signin" className="nav-link"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "black"
                        }}
                        >
                        התחברות
                        </NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink to="/signup" className="nav-link" 
                        activeStyle={{
                            fontWeight: "bold",
                            color: "black"
                        }}
                        >
                        הרשמה
                        </NavLink>
                    </li>
                </ul>    
            </div>
            </div>
        </nav>
    );
}
 
export default Navbar;