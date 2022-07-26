import { MutableRefObject, useRef, useState } from 'react';
import {
    AnimatePresence,
    motion,
    MotionValue,
    useMotionValue,
    useTransform,
} from 'framer-motion';
import { SwipeDirection } from './types';
import { AlbumImage, Track } from 'spotify-api';
import { FaHeart, FaMusic, FaTrash } from 'react-icons/fa';

export type SwipeCardStackProps = {
    songs?: Track[];
    onSwipe: (direction: SwipeDirection) => void;
    current: number;
};

export type SwipeCardProps = {
    img: AlbumImage;
    onSwipe: (direction: SwipeDirection) => void;
    containerRef: MutableRefObject<null>;
    index: number;
};

function SwipeCardOverlay({
    leftOpacity,
    rightOpacity,
}: {
    leftOpacity: MotionValue;
    rightOpacity: MotionValue;
}) {
    return (
        <>
            <motion.div
                className="card absolute top-0 left-0 flex aspect-square h-full w-full items-center justify-center bg-green-500 text-white opacity-50"
                style={{ opacity: rightOpacity }}
                key="right-swipe-overlay">
                <FaHeart />
            </motion.div>
            <motion.div
                className="card absolute top-0 left-0 flex aspect-square h-full w-full items-center justify-center   bg-red-500 text-white opacity-50"
                style={{ opacity: leftOpacity }}
                key="left-swipe-overlay">
                <FaTrash />
            </motion.div>
        </>
    );
}

function LoadingCard() {
    return (
        <motion.div
            key="loading-card"
            className="card absolute flex aspect-square w-72 items-center justify-center bg-gradient-to-br from-primary to-secondary font-title text-5xl  shadow"
            layout
            animate={{
                rotate: [0, 180, 360, 0],
                borderRadius: ['0.5rem', '50%', '50%', '0.5rem'],
            }}
            transition={{
                duration: 2,
                ease: 'easeInOut',
                times: [0, 0.25, 0.5, 1],
                repeat: Infinity,
                repeatDelay: 1,
            }}>
            <motion.div
                className="absolute rounded-full bg-white p-10 "
                layout
                animate={{
                    scale: [0, 1, 1, 0],
                }}
                transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    times: [0, 0.25, 0.5, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                }}></motion.div>
            <FaMusic className="text-white" />
        </motion.div>
    );
}

function SwipeCard({ img, onSwipe, containerRef, index }: SwipeCardProps) {
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const top = index === 0;
    const dragRange = [0, 30, 60];

    const x = useMotionValue(0);
    const posX = useTransform(x, (x) => (x > 0 ? x : 0));
    const negX = useTransform(x, (x) => (x < 0 ? -x : 0));
    const rightOverlayOpacity = useTransform(posX, dragRange, [0, 0, 0.8]);
    const leftOverlayOpacity = useTransform(negX, dragRange, [0, 0, 0.8]);

    return (
        <motion.div
            className="card absolute aspect-square w-72 text-5xl shadow"
            layout
            drag={top}
            layoutId={top ? 'top' : undefined}
            dragConstraints={containerRef}
            dragSnapToOrigin={true}
            dragElastic={0.3}
            onDragStart={(event, info) => {
                setDragStart(info.point);
            }}
            onDragEnd={(event, info) => {
                const delta = {
                    x: info.point.x - dragStart.x,
                    y: info.point.y - dragStart.y,
                };
                if (Math.abs(delta.x) > 75) {
                    onSwipe(Math.sign(delta.x) === -1 ? 'left' : 'right');
                }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 5 - index, x }}
            data-testid={top ? 'card-stack-top' : `card-stack-${index}`}>
            <img
                alt="Album cover"
                className="card h-full w-full"
                src={img.url}
            />
            {top && (
                <SwipeCardOverlay
                    leftOpacity={leftOverlayOpacity}
                    rightOpacity={rightOverlayOpacity}
                />
            )}
        </motion.div>
    );
}

export function SwipeCardStack({
    songs,
    onSwipe,
    current,
}: SwipeCardStackProps) {
    const containerRef = useRef(null);

    return (
        <div
            className="flex aspect-square w-full flex-col items-center justify-center overflow-clip"
            ref={containerRef}>
            <AnimatePresence>
                {songs ? (
                    songs.map((s, i) => (
                        <SwipeCard
                            img={s.album.images[0]}
                            onSwipe={onSwipe}
                            index={i}
                            key={`${s.name}-stack`}
                            containerRef={containerRef}
                        />
                    ))
                ) : (
                    <LoadingCard />
                )}
            </AnimatePresence>
        </div>
    );
}
