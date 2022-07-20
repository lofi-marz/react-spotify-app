import { useQuery } from '@tanstack/react-query';
import { GetPlaylistResponse } from './types';
import { getSpotifyApi, getSpotifyToken } from './api';

function useSpotifyToken() {
    return useQuery(['token'], () => getSpotifyToken());
}

function useSpotifyApiRequest<T>(params: object, apiPath: string) {
    const { data: token } = useSpotifyToken();
    return useQuery(
        ['spotify', params, apiPath],
        () => getSpotifyApi<T>(params, token, apiPath),
        { enabled: !!token }
    );
}

export function useSpotifyPlaylistRequest() {
    const TEST_PLAYLIST_URL = 'playlists/4dCrUKnLCNoAnbAz65uMDS';
    const query = {
        additional_types: 'track',
        market: 'GB',
    };

    return useSpotifyApiRequest<GetPlaylistResponse>(query, TEST_PLAYLIST_URL);
}
