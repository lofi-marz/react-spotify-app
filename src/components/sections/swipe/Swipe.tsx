import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import demondays from './albums/demondays.jpg';
import mbdtf from './albums/mbdtf.jpg';
import graduation from './albums/graduation.jpg';
import { FaHeart, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { SwipeDirection } from './types';
import { SwipeCardStack } from './SwipeCardStack';

/*interface AlbumSource {
    prev: (count: number) => st
    next: (count: number) => string[];
}*/

const songs = [mbdtf, graduation, demondays];

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
    useSpotifyPlaylistRequest();
    const onSwipe = (direction: SwipeDirection) => {
        console.log(direction);
        setCurrent((prevCurrent) => {
            console.log(prevCurrent);
            const newIndex = prevCurrent + (direction == 'left' ? -1 : 1);
            if (newIndex < 0) {
                return songs.length - 1;
            } else if (newIndex >= songs.length) {
                return 0;
            }

            return newIndex;
        });
    };

    /*

     */
    return (
        <div className="flex h-screen flex-col justify-center overflow-hidden">
            <AnimatePresence>
                <div className="fixed top-0 left-0 -z-10 flex h-screen w-screen items-center justify-center overflow-hidden">
                    <motion.div
                        className="aspect-square h-[110vh] brightness-50 saturate-50"
                        animate={{ x: [0, -250, 0] }}
                        transition={{ duration: 40, repeat: Infinity }}
                        key={songs[current].src}>
                        <Image
                            className="transition-all"
                            src={songs[current]}
                            layout="fill"
                        />
                    </motion.div>
                    <motion.div
                        className="fixed h-screen w-screen bg-black"
                        key={`${songs[current].src}-cover`}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}></motion.div>
                </div>
            </AnimatePresence>
            <AnimatePresence>
                <SwipeCardStack
                    onSwipe={onSwipe}
                    songs={songs}
                    current={current}
                />
            </AnimatePresence>
            <SwipeControls onSwipe={onSwipe} />
        </div>
    );
}
