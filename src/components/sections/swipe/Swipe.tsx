import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FaHeart, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { SwipeDirection } from './types';
import { SwipeCardStack } from './SwipeCardStack';
import { Track } from 'spotify-api';
/*interface AlbumSource {
    prev: (count: number) => st
    next: (count: number) => string[];
}*/

//TODO: Rename this file to something more useful

type SwipeControlsProps = {
    onSwipe: (direction: SwipeDirection) => void;
};

function SwipeControls({ onSwipe }: SwipeControlsProps) {
    //TODO: Refactor these buttons into 1 component
    return (
        <div className="flex h-48 items-center justify-center gap-5 font-black">
            <button
                className="rounded-full bg-white p-5 text-4xl text-red-500 shadow-2xl"
                onClick={() => onSwipe('left')}
                data-testid="swipe-left">
                <FaThumbsDown />
            </button>
            <button className="rounded-full bg-white p-5 text-4xl text-blue-500 shadow-2xl transition-all active:brightness-50">
                <FaHeart />
            </button>
            <button
                className="rounded-full bg-white p-5 text-4xl text-green-500 shadow-2xl"
                onClick={() => onSwipe('left')}
                data-testid="swipe-right">
                <FaThumbsUp />
            </button>
        </div>
    );
}

function ScrollingBackground({ track }: { track: Track }) {
    //Not sure about this
    return (
        <AnimatePresence>
            <div className="fixed top-0 left-0 -z-10 flex h-screen w-screen scale-150 items-center justify-center overflow-hidden">
                <motion.div
                    className="aspect-square h-screen brightness-50 saturate-50"
                    animate={{ x: [0, -250, 0] }}
                    transition={{ duration: 40, repeat: Infinity }}
                    key={track.name}
                    layout>
                    <Image
                        className="transition-all"
                        src={track.album.images[0].url}
                        layout="fill"
                        alt={`${track.album.name} cover`}
                    />
                </motion.div>
                <motion.div
                    className="fixed h-screen w-screen bg-black"
                    key={`${track.name}-cover`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1 }}></motion.div>
            </div>
        </AnimatePresence>
    );
}

type SwipeProps = {
    tracks: Track[];
};
export function Swipe({ tracks }: SwipeProps) {
    const [current, setCurrent] = useState(0);

    const onSwipe = (direction: SwipeDirection) => {
        console.log(direction);
        if (!tracks) return;
        setCurrent((prevCurrent) => {
            console.log(prevCurrent);
            const newIndex = prevCurrent + 1;
            if (newIndex < 0) {
                return tracks.length - 1;
            } else if (newIndex >= tracks.length) {
                return 0;
            }

            return newIndex;
        });
    };

    return tracks.length ? (
        <div className="flex h-screen flex-col justify-center">
            <AnimatePresence>
                <div className="mx-auto flex w-64 flex-col items-center justify-center text-center">
                    <motion.h1
                        className="w-full overflow-clip text-3xl font-bold"
                        data-testid="track-name">
                        {tracks[current].name}
                    </motion.h1>
                    <h2
                        className="text-gradient w-full w-64 truncate text-2xl"
                        data-testid="track-artist-name">
                        {tracks[current].artists[0].name}
                    </h2>
                </div>
            </AnimatePresence>

            <SwipeCardStack
                onSwipe={onSwipe}
                songs={tracks.slice(current, current + 5)}
                current={current}
            />

            <SwipeControls onSwipe={onSwipe} />
        </div>
    ) : (
        <h1></h1>
    );
}
