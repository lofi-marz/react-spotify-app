import type { NextPage } from 'next';

import React, { useContext } from 'react';
import Login from 'components/Login';
import { SpotifyApiContext } from 'pages/_app';

const Home: NextPage = () => {
    //TODO: Change this to serversideprops
    const token = useContext(SpotifyApiContext);
    if (!token) return <Login />;

    return <h1>{token}</h1>;
    /*return (
        <Swipe tracks={playlist.tracks.items.map(({ track }) => track)}></Swipe>
    );*/
};

export default Home;
