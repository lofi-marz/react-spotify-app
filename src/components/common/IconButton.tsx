import { FaThumbsDown } from 'react-icons/fa';

export function IconButton() {
    return <button
        className="rounded-full bg-white p-5 text-4xl text-red-500 shadow"
        onClick={() =>}
        data-testid="swipe-left">
        <FaThumbsDown />
    </button>;
}
