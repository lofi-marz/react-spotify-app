import SpotifyApiContext } from 'pages';

function SpotifyApiContextProvider({ token }: { token: string }) {
    return (
        <SpotifyApiContext.Provider value={token}></SpotifyApiContext.Provider>
    );
}
