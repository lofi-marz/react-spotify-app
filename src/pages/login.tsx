import type { NextPage } from 'next';

import React, { useContext, useEffect } from 'react';
import { SpotifyApiContext } from 'pages/_app';
import { useRouter } from 'next/router';
import {
    GetAuthorizeResponse,
    useGetSpotifyLoginToken,
    useLocalSpotifyState,
    useLocalToken,
} from '../spotify-api';
import useLocalStorageSync from '../hooks/useLocalStorageSync';
import { createStoredToken } from '../spotify-api/api';

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
            router.push('/');
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
            router.push('/');
        }
    }, [isSuccess]);

    return <h1>{JSON.stringify(storedToken)}</h1>;
    /*return (
        <Swipe tracks={playlist.tracks.items.map(({ track }) => track)}></Swipe>
    );*/
};

export default Login;
