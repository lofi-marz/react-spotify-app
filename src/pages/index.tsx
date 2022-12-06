import type { NextPage } from 'next';

import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import LoginGreeting from 'components/LoginGreeting';

import { Swipe } from 'components/sections/swipe/Swipe';
import {
    GetPlaylistResponse,
    SpotifyApiContext,
    StoredToken,
    useSpotifyPlaylistRequest,
} from 'spotify-api';
import { AnimatePresence } from 'framer-motion';

function SwipeSection() {
    //TODO: Change this to serversideprops
}

function StateSelector({
    token,
    status,
    playlist,
}: {
    token: StoredToken | null;
    status: string;
    playlist?: GetPlaylistResponse;
}) {
    if (status === 'error' || !token)
        return <LoginGreeting key="login-screen" />;
    if (token)
        return (
            <Swipe
                key="swipe-screen"
                tracks={playlist?.tracks.items.map(
                    ({ track }) => track
                )}></Swipe>
        );
    return <LoginGreeting key="login-screen" />;
}

const Home: NextPage = () => {
    //TODO: Change this to serversideprops

    const token = useContext(SpotifyApiContext);
    const router = useRouter();

    const {
        data: playlist,
        isSuccess,
        status,
    } = useSpotifyPlaylistRequest(token ? token.accessToken : null);

    useEffect(() => {
        //if (!token) router.push('/login');
        console.log('Reloading:', token);
    }, [token]);

    return (
        <AnimatePresence>
            <StateSelector token={token} status={status} playlist={playlist} />
        </AnimatePresence>
    );
    /*return (
        <Swipe tracks={playlist.tracks.items.map(({ track }) => track)}></Swipe>
    );*/
};

export default Home;
