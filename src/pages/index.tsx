import type { NextPage } from 'next';

import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import LoginGreeting from '../components/LoginGreeting';

import { Swipe } from 'components/sections/swipe/Swipe';
import { useSpotifyPlaylistRequest } from '../spotify-api';
import { SpotifyApiContext } from '../spotify-api/SpotifyApiContext';

function SwipeSection() {
    //TODO: Change this to serversideprops
    const token = useContext(SpotifyApiContext);
    const { data: playlist, isSuccess } = useSpotifyPlaylistRequest(
        token ? token.accessToken : null
    );

    if (!isSuccess) return <h1>Error</h1>;

    return (
        <Swipe tracks={playlist.tracks.items.map(({ track }) => track)}></Swipe>
    );
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
