import { useEffect, useState } from 'react';

export default function useLocalStorageSync<T>(key: string, fallback: T) {
    const [value, setValue] = useState<T>(fallback);

    useEffect(() => {
        const oldVal = localStorage.getItem(key);
        console.log('Retrieved:', key, oldVal);
        if (oldVal != null) setValue(JSON.parse(oldVal) as T);
    }, []);

    useEffect(() => {
        console.log('Setting value:', key, value);
        if (value == null) return;
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue] as const;
}
