import type { NextPage } from 'next';

import React, { useContext, useEffect } from 'react';
import { SpotifyApiContext } from 'pages/_app';
import { useRouter } from 'next/router';
import LoginGreeting from '../components/LoginGreeting';

const Home: NextPage = () => {
    //TODO: Change this to serversideprops

    const token = useContext(SpotifyApiContext);
    const router = useRouter();
    useEffect(() => {
        //if (!token) router.push('/login');
        console.log('Reloading:', token);
    }, [token]);

    return token ? (
        <h1 className="w-screen">{JSON.stringify(token)}</h1>
    ) : (
        <LoginGreeting />
    );
    /*return (
        <Swipe tracks={playlist.tracks.items.map(({ track }) => track)}></Swipe>
    );*/
};

export default Home;
