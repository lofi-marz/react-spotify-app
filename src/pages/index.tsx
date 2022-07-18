import { Swipe } from 'components/sections/swipe/Swipe';
import type { NextPage } from 'next';

import React, { useEffect, useState } from 'react';
import { Track, useSpotifyPlaylistRequest } from '../spotify-api';

const Home: NextPage = () => {
    //TODO: Change this to serversideprops
    const playlist = useSpotifyPlaylistRequest();
    const [tracks, setTracks] = useState<Track[]>([]);
    useEffect(() => {
        if (!playlist) return;
        console.log('Playlist:', playlist);
        setTracks(playlist.tracks.items.map(({ track }) => track));
    }, [playlist]);

    return <Swipe tracks={tracks}></Swipe>;
};

export default Home;
