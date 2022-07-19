import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import { PointerEventHandler, useRef, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';

type TrackControlsProps = {
    length: string;
};

export function TrackControls() {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className="flex w-full justify-evenly">
            <button
                className="p-5 text-4xl text-red-500 drop-shadow"
                data-testid="swipe-left">
                <FaBackward />
            </button>
            <button
                className="rounded-full bg-white p-5 text-4xl text-red-500 shadow"
                data-testid="music-play">
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
                className="p-5 text-4xl text-red-500 drop-shadow"
                data-testid="swipe-left">
                <FaForward />
            </button>
        </div>
    );
}

export function TrackProgressBar() {
    const progressBarRef = useRef(null);
    const dragControls = useDragControls();

    const startDrag: PointerEventHandler = (event) => {
        dragControls.start(event, { snapToCursor: true });
    };

    return (
        <div
            className="flex  w-full items-center px-10 py-5"
            onPointerDown={startDrag}>
            <motion.div
                key="circle"
                className="h-4 w-4 rounded-full bg-primary drop-shadow"
                drag="x"
                dragElastic={0}
                dragMomentum={false}
                dragConstraints={progressBarRef}
                dragControls={dragControls}
                whileTap={{ scale: 1.2 }}></motion.div>
            <div
                key="bar"
                className="h-1 w-full bg-primary"
                ref={progressBarRef}></div>
        </div>
    );
}
