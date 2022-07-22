import type { NextPage } from 'next';

import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import {
    GetAuthorizeResponse,
    SpotifyApiContext,
    useGetSpotifyLoginToken,
    useLocalSpotifyState,
    useLocalToken,
} from 'spotify-api';
import useLocalStorageSync from '../hooks/useLocalStorageSync';
import { createStoredToken } from 'spotify-api/api';

function LoginSuccessMessage() {
    return <header className="">Login Successful!</header>;
}

function LoginFailureMessage() {
    const router = useRouter();
    return (
        <header className="flex flex-col items-center justify-center gap-5">
            Login failed
            <button
                className="rounded-full bg-white px-10 py-5 text-primary shadow"
                onClick={() => router.push('/')}>
                Try again?
            </button>
        </header>
    );
}

const Login: NextPage = () => {
    //TODO: Change this to serversideprops

    const token = useContext(SpotifyApiContext);
    const router = useRouter();
    const [storedToken, setStoredToken] = useLocalToken();
    const [storedState] = useLocalSpotifyState();
    const [storedCodeVerifier] = useLocalStorageSync<string | null>(
        'spotify-code-verifier',
        null
    );
    const authCallbackParams = router.query as Partial<GetAuthorizeResponse>; //We probably shouldn't assume we have them
    const { data, isSuccess, error } = useGetSpotifyLoginToken(
        authCallbackParams,
        storedState,
        storedCodeVerifier
    );
    console.log(
        authCallbackParams.error,
        authCallbackParams.state,
        storedState
    );

    useEffect(() => {
        console.log('Stored token:', storedToken);
        if (storedToken) {
            //router.push('/');
        }
    }, []);

    useEffect(() => {
        console.log('Stored token:', storedToken);
        if (storedToken) {
            //router.push('/');
        }
    }, [storedToken]);

    useEffect(() => {
        if (isSuccess) {
            console.log('Response token:', data);

            setStoredToken(createStoredToken(data));
            //router.push('/');
        }
    }, [isSuccess]);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-primary text-center font-title text-5xl text-white">
            {isSuccess ? <LoginSuccessMessage /> : <LoginFailureMessage />}
        </div>
    );

    /*return (
        <Swipe tracks={playlist.tracks.items.map(({ track }) => track)}></Swipe>
    );*/
};

export default Login;
