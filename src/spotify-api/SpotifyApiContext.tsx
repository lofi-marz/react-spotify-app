import { SpotifyApiContext } from 'pages/_app';

function SpotifyApiContextProvider() {
    return (
        <SpotifyApiContext.Provider value={token}></SpotifyApiContext.Provider>
    );
}
