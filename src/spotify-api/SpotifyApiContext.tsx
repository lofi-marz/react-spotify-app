import React from 'react';
import { StoredToken } from './types';
import { WithChildrenProps } from '../types';

export const SpotifyApiContext = React.createContext<StoredToken | null>(null);

export function SpotifyApiContextProvider({
    token,
    children,
}: { token: StoredToken | null } & WithChildrenProps) {
    return (
        <SpotifyApiContext.Provider value={token}>
            {children}
        </SpotifyApiContext.Provider>
    );
}
