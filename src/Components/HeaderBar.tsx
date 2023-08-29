import * as React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Image, Nav, Navbar} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HeaderBar = () => {
    let navigate = useNavigate();
    const {isAuthenticated, user, loginWithRedirect, logout} = useAuth0();

    return (
        <Navbar sticky="top" expand="md" className={"mx-3"}>
            <Navbar.Brand className={"brand mx-3 position-relative"}>
                Unplugged
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className={"mx-3"}/>
            {!isAuthenticated && (
                <Navbar.Collapse id="basic-navbar-nav" className={"justify-content-end px-5"}>
                    <Nav>
                        <Nav.Link onClick={() => loginWithRedirect()}>Login</Nav.Link>
                        <Nav.Link onClick={() => loginWithRedirect()}>Sign-up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>)}

            {isAuthenticated && user && (
                <Navbar.Collapse id="basic-navbar-nav" className={"justify-content-end px-5"}>
                    <Nav>
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link href="/explore">Explore</Nav.Link>
                        <Nav.Link href="/post">Add Post</Nav.Link>
                        <Nav.Link href={"/profile/"+user.nickname} className={"d-md-none"}>Profile</Nav.Link>
                        <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                    </Nav>

                    <Image roundedCircle
                           src={user?.picture}
                           className={"userAvatar d-none d-md-flex"}
                           onClick={() => navigate('/profile/'+user.nickname)}
                    />
                </Navbar.Collapse>)}

        </Navbar>
    );
};

export default HeaderBar;