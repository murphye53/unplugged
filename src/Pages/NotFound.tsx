import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import {Button, Container} from "react-bootstrap";

function NotFound() {
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    return (
        <Container>
            <ErrorOutlineIcon sx={{
                fontSize: '10rem'
            }}/>
            <h3>Oh dear...</h3>
            <h2>We can't find the page you're looking for</h2>

            {isAuthenticated && (<Button
                variant='contained'
                onClick={() => navigate('/feed')}>
                Return to feed
            </Button>)}

            {!isAuthenticated && (<Button
                variant='contained'
                onClick={() => navigate('/')}>
                Visit homepage
            </Button>)}
        </Container>
    );
}

export default NotFound;