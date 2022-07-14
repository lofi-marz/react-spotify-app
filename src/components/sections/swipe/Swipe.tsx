import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FaHeart, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { SwipeDirection } from './types';
import { SwipeCardStack } from './SwipeCardStack';
import { Track, useSpotifyPlaylistRequest } from 'spotify-api';
/*interface AlbumSource {
    prev: (count: number) => st
    next: (count: number) => string[];
}*/

type SwipeControlsProps = {
    onSwipe: (direction: SwipeDirection) => void;
};

function SwipeControls({ onSwipe }: SwipeControlsProps) {
    return (
        <div className="flex h-48 items-center justify-center gap-5 font-black">
            <button
                className="rounded-full bg-white p-5 text-4xl text-red-500 shadow-2xl"
                onClick={() => onSwipe('left')}>
                <FaThumbsDown />
            </button>
            <button className="rounded-full bg-white p-5 text-4xl text-blue-500 shadow-2xl transition-all active:brightness-50">
                <FaHeart />
            </button>
            <button
                className="rounded-full bg-white p-5 text-4xl text-green-500 shadow-2xl"
                onClick={() => onSwipe('left')}>
                <FaThumbsUp />
            </button>
        </div>
    );
}

export function Swipe() {
    const [current, setCurrent] = useState(0);
    const [songs, setSongs] = useState<Track[]>([]);
    const onSwipe = (direction: SwipeDirection) => {
        console.log(direction);
        if (!songs) return;
        setCurrent((prevCurrent) => {
            console.log(prevCurrent);
            const newIndex = prevCurrent + 1;
            if (newIndex < 0) {
                return songs.length - 1;
            } else if (newIndex >= songs.length) {
                return 0;
            }

            return newIndex;
        });
    };

    const playlist = useSpotifyPlaylistRequest();

    useEffect(() => {
        if (!playlist) return;
        console.log('Playlist:', playlist);
        setSongs(playlist.tracks.items.map(({ track }) => track));
    }, [playlist]);

    useEffect(() => {
        console.log(songs);
    }, [songs]);

    return (
        songs.length && (
            <div className="flex h-screen flex-col justify-center">
                <AnimatePresence>
                    <div className="fixed top-0 left-0 -z-10 flex h-screen w-screen scale-150 items-center justify-center overflow-hidden">
                        <motion.div
                            className="aspect-square h-screen brightness-50 saturate-50"
                            animate={{ x: [0, -250, 0] }}
                            transition={{ duration: 40, repeat: Infinity }}
                            key={songs[current].name}
                            layout>
                            <Image
                                className="transition-all"
                                src={songs[current].album.images[0].url}
                                layout="fill"
                            />
                        </motion.div>
                        <motion.div
                            className="fixed h-screen w-screen bg-black"
                            key={`${songs[current].name}-cover`}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 1 }}></motion.div>
                    </div>
                </AnimatePresence>

                <SwipeCardStack
                    onSwipe={onSwipe}
                    songs={songs.slice(current, current + 5)}
                    current={current}
                />
                <SwipeControls onSwipe={onSwipe} />
            </div>
        )
    );
}
