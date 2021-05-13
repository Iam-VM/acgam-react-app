const NavBar = ({userState, signOut}) => {
    return (
        <div>
            <div>Hello, {userState.name}.</div>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default NavBar;
