import { MutableRefObject, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import { SwipeDirection } from './types';

export type SwipeCardStackProps = {
    songs: StaticImageData[];
    onSwipe: (direction: SwipeDirection) => void;
    current: number;
};

export type SwipeCardProps = {
    img: StaticImageData;
    onSwipe: (direction: SwipeDirection) => void;
    containerRef: MutableRefObject<null>;
    top?: boolean;
};

function SwipeCard({ img, onSwipe, containerRef, top }: SwipeCardProps) {
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    return (
        <motion.div
            className={clsx('m-auto w-full w-2/3 shadow-2xl', {
                absolute: !top,
            })}
            key={img.src}
            layout
            drag={top}
            dragConstraints={containerRef}
            dragSnapToOrigin={true}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <Image
                alt="Album cover"
                className="card"
                src={img}
                layout="responsive"
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
    const top = songs[current];
    const filteredSongs = [
        ...songs.slice(0, current).concat(songs.slice(current + 1)),
        top,
    ];

    return (
        <div
            className="flex aspect-square w-full items-center justify-center"
            ref={containerRef}>
            {filteredSongs.map((s, i) => (
                <SwipeCard
                    img={s}
                    onSwipe={onSwipe}
                    top={i === songs.length - 1}
                    key={s.src}
                    containerRef={containerRef}></SwipeCard>
            ))}
        </div>
    );
}
