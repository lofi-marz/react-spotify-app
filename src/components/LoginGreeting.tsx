import React, { useEffect, useState } from 'react';
import spotify from '../../config.json';
import qs from 'qs';
import { useLocalSpotifyState } from '../spotify-api';
import useLocalStorageSync from '../hooks/useLocalStorageSync';
import { FaMusic } from 'react-icons/fa';
import { motion } from 'framer-motion';

function getRandomChars(minLength: number, maxLength = -1) {
    let chars = '';
    let length: number;
    if (maxLength < 0) {
        length = minLength;
    } else {
        length =
            minLength + Math.floor(Math.random() * (maxLength - minLength));
    }

    for (let i = 0; i < length; i++) {
        chars += Math.floor(Math.random() * 25).toString(26);
    }
    return chars;
}

function getCodeVerifier() {
    //TODO: Does it matter that we aren't including non-alphanumeric chars
    return getRandomChars(43, 128);
}
async function generateCodeChallenge(codeVerifier: string) {
    //Shout outs to https://github.com/tobika/spotify-auth-PKCE-example/blob/main/public/main.js
    const digest = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(codeVerifier)
    );

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

export function LoginGreeting() {
    //TODO: Change this to serversideprops

    const [state, setState] = useLocalSpotifyState();
    const [storedCodeVerifier, setStoredCodeVerifier] = useLocalStorageSync(
        'spotify-code-verifier',
        ''
    );
    const [codeChallenge, setCodeChallenge] = useState('');

    useEffect(() => {
        if (state) {
            //If state already exists, remove it
            //TODO: Do we need to remove it?
            localStorage.removeItem('spotify-state');
            console.log('state:', state);
        } else {
            //If state doesn't exist, create a new one
            const newState = getRandomChars(10);
            setState(newState);
        }

        setStoredCodeVerifier(getCodeVerifier());
    }, []);

    useEffect(() => {
        //TODO: Maybe memoize this?
        (async () => {
            setCodeChallenge(await generateCodeChallenge(storedCodeVerifier));
        })();
    }, [storedCodeVerifier]);

    const params = {
        client_id: spotify.clientId,
        response_type: 'code',
        redirect_uri: 'http://localhost:3005/login',
        state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
    };
    //TODO: Maybe replace the placeholder divs with css
    return (
        <motion.div
            className="relative flex h-screen  w-full items-center justify-center bg-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="-z-5 absolute flex h-full w-full flex-row">
                <div className="h-full w-full "></div>
                <div className="h-full w-full grow bg-white"></div>
            </div>
            <div className="flex  h-screen  w-full  max-w-lg flex-col items-center justify-center font-title text-white">
                <header className="z-10 flex h-1/2 w-full flex-col items-center justify-center gap-5 rounded-br-[100px] bg-primary bg-white lg:rounded-r-full">
                    <div className="flex flex-row items-center justify-center gap-5 ">
                        <div className="flex items-center justify-center rounded-full bg-white p-5 text-3xl text-primary">
                            <FaMusic />
                        </div>
                        <h1 className="text-5xl">Swipeify</h1>
                    </div>
                    <h2 className="text-xl opacity-90">
                        Make finding music fun.
                    </h2>
                </header>
                <div className="relative flex w-full grow items-center justify-center">
                    <div className="absolute h-full w-full"></div>
                    <div className="z-10 flex h-full w-full items-center justify-center rounded-tl-[100px] bg-white text-3xl lg:rounded-l-full">
                        <a
                            href={
                                'https://accounts.spotify.com/authorize?' +
                                qs.stringify(params)
                            }
                            className="card rounded-full bg-primary px-10 py-5 text-white shadow">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default LoginGreeting;
