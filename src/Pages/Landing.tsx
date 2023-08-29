import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import bgimage from '../Media/landing-bg.jpg';
import {Button, ButtonGroup, Container} from "react-bootstrap";
import {Navigate} from "react-router-dom";

function Landing() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    if(isAuthenticated)
        return (<Navigate to="/feed"/>)

    return (
            <div>
                <img className={"landingBg"}
                    src={bgimage}
                     alt={"Jiu Jitsu practitioners watching their instructor"}
                />
                <Container className={"landingCTA p-3"}>
                    <h2 className={"cta flex-grow-1 w-100"}>A place to disconnect from unsocial media</h2>
                    <ButtonGroup className={"cta flex-grow-1 w-100 pt-2"}>
                        <Button variant="outline-primary" onClick={() => loginWithRedirect()}>Log In</Button>
                        <Button onClick={() => loginWithRedirect()}>Sign Up</Button>
                    </ButtonGroup>
                </Container>
            </div>
    )
}

export default Landing;