import React from 'react';
import { StoredToken } from './types';

export const SpotifyApiContext = React.createContext<StoredToken | null>(null);

function SpotifyApiContextProvider() {
    return (
        <SpotifyApiContext.Provider value={token}></SpotifyApiContext.Provider>
    );
}
