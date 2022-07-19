import type { NextPage } from 'next';

import React from 'react';
import { useSpotifyPlaylistRequest } from '../spotify-api';
import { Swipe } from '../components/sections/swipe/Swipe';

const Home: NextPage = () => {
    //TODO: Change this to serversideprops
    const {
        status,
        data: playlist,
        error,
        isFetching,
    } = useSpotifyPlaylistRequest();

    if (status != 'success') return <h1>Loading</h1>;
    return (
        <Swipe tracks={playlist.tracks.items.map(({ track }) => track)}></Swipe>
    );
};

export default Home;
