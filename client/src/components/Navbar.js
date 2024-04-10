const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>The hub of SECUOS</h1>
            <div className="links">
                
                <a href="/Events" style={{
                    color:"gold",
                    backgroundColor: "navy",
                    borderRadius:"4px"
                }}>Events</a>
                
                <a href="/RSO" style={{
                    color:"gold",
                    backgroundColor: "navy",
                    borderRadius:"4px"
                }}>RSO</a>
                <a href="/Dashboard" style={{
                    color:"gold",
                    backgroundColor: "navy",
                    borderRadius:"4px"
                }}>Dashboard</a>
                <a href="/Login" style={{
                    color:"gold",
                    backgroundColor: "navy",
                    borderRadius:"4px"
                }}>Login</a>
            </div>
        </nav>
     );
} 
export default Navbar;
