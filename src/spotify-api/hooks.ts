import { useQuery } from '@tanstack/react-query';
import {
    GetAuthorizeResponse,
    GetPlaylistResponse,
    StoredToken,
} from './types';
import {
    getSpotifyApi,
    getSpotifyToken,
    getSpotifyTokenFromLogin,
} from './api';
import useLocalStorageSync from '../hooks/useLocalStorageSync';

function useSpotifyToken() {
    return useQuery(['token'], () => getSpotifyToken());
}

function useSpotifyApiRequest<T>(params: object, apiPath: string) {
    const { data: token } = useSpotifyToken();
    return useQuery(
        ['spotify', params, apiPath],
        () => getSpotifyApi<T>(params, token as string, apiPath),
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

export function useGetSpotifyLoginToken(
    params: Partial<GetAuthorizeResponse>,
    expectedState: string | null,
    expectedCodeVerifier: string | null
) {
    return useQuery(
        ['spotify', 'login', params],
        () =>
            getSpotifyTokenFromLogin(
                params.code as string,
                expectedCodeVerifier as string
            ),
        {
            enabled: Boolean(
                !params.error &&
                    params.code &&
                    params.state &&
                    params.state === expectedState &&
                    expectedCodeVerifier
            ),
        }
    );
}

export function useLocalToken() {
    return useLocalStorageSync<StoredToken | null>('spotify-token', null);
}

export function useLocalSpotifyState() {
    return useLocalStorageSync<string | null>('spotify-state', null);
}
