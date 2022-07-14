import { MutableRefObject, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { SwipeDirection } from './types';
import { AlbumImage, Track } from 'spotify-api';

export type SwipeCardStackProps = {
    songs: Track[];
    onSwipe: (direction: SwipeDirection) => void;
    current: number;
};

export type SwipeCardProps = {
    img: AlbumImage;
    onSwipe: (direction: SwipeDirection) => void;
    containerRef: MutableRefObject<null>;
    index: number;
};

function SwipeCard({ img, onSwipe, containerRef, index }: SwipeCardProps) {
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    console.log(img.url, top);
    return (
        <motion.div
            className={clsx(
                'card m-auto aspect-square h-72 w-72 shadow-2xl  shadow-2xl',
                {
                    absolute: index > 0,
                }
            )}
            layout
            drag={index === 0}
            layoutId={index === 0 ? 'top' : undefined}
            dragConstraints={containerRef}
            dragSnapToOrigin={true}
            dragElastic={0.05}
            onDragStart={(event, info) => {
                setDragStart(info.point);
            }}
            onDragEnd={(event, info) => {
                const delta = {
                    x: info.point.x - dragStart.x,
                    y: info.point.y - dragStart.y,
                };
                if (Math.abs(delta.x) > 100) {
                    onSwipe(Math.sign(delta.x) === -1 ? 'left' : 'right');
                }
            }}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 5 - index }}>
            <img
                alt="Album cover"
                className="card h-full w-full"
                src={img.url}
            />
        </motion.div>
    );
}

export function SwipeCardStack({
    songs,
    onSwipe,
    current,
}: SwipeCardStackProps) {
    const containerRef = useRef(null);
    const reversedSongs = [...songs];
    return (
        <div
            className="flex aspect-square w-full items-center justify-center space-x-5 space-y-5 "
            ref={containerRef}>
            <AnimatePresence>
                {reversedSongs.map((s, i) => (
                    <SwipeCard
                        img={s.album.images[0]}
                        onSwipe={onSwipe}
                        index={i}
                        key={`${s.name}-stack`}
                        containerRef={containerRef}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
