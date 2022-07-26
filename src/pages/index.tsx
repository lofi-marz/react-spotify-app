import type { NextPage } from 'next';

import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import LoginGreeting from 'components/LoginGreeting';

import { Swipe } from 'components/sections/swipe/Swipe';
import { SpotifyApiContext, useSpotifyPlaylistRequest } from 'spotify-api';

function SwipeSection() {
    //TODO: Change this to serversideprops
    const token = useContext(SpotifyApiContext);
    const {
        data: playlist,
        isSuccess,
        status,
    } = useSpotifyPlaylistRequest(token ? token.accessToken : null);

    if (status === 'error') return <h1>Error</h1>;
    const tracks = playlist?.tracks.items.map(({ track }) => track);
    return <Swipe tracks={tracks}></Swipe>;
}

const Home: NextPage = () => {
    //TODO: Change this to serversideprops

    const token = useContext(SpotifyApiContext);
    const router = useRouter();
    useEffect(() => {
        //if (!token) router.push('/login');
        console.log('Reloading:', token);
    }, [token]);

    return token ? <SwipeSection /> : <LoginGreeting />;
    /*return (
        <Swipe tracks={playlist.tracks.items.map(({ track }) => track)}></Swipe>
    );*/
};

export default Home;
