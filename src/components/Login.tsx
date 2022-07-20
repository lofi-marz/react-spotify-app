import React, { useEffect } from 'react';
import spotify from '../../config.json';
import qs from 'qs';

function getRandomChars() {
    let chars = '';
    for (let i = 0; i < 10; i++) {
        chars += Math.floor(Math.random() * 25).toString(26);
    }
    return chars;
}

export function Login() {
    //TODO: Change this to serversideprops
    const query = { useRouter };

    useEffect(() => {
        if (state) {
            //If state already exists, remove it
            setLocalState(state);
            localStorage.removeItem('state');
        } else {
            //If state doesn't exist, create a new one
            const newState = getRandomChars();
            setState(newState);
        }
    }, []);

    console.log(state);
    const params = {
        client_id: spotify.clientId,
        response_type: 'code',
        redirect_uri: 'http://localhost:3005/login',
        state: localState,
    };

    return (
        <div>
            <h1>Hi! Welcome!</h1>
            <a
                href={
                    'https://accounts.spotify.com/authorize?' +
                    qs.stringify(params)
                }>
                Login
            </a>
        </div>
    );
}

export default Login;
