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
            </div>
        </nav>
     );
} 
export default Navbar;
