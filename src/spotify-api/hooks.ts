import { useQuery } from '@tanstack/react-query';
import {
    GetAuthorizeResponse,
    GetPlaylistResponse,
    StoredToken,
} from './types';
import {
    getSpotifyApi,
    getSpotifyTokenFromLogin,
    postRefreshToken,
} from './api';
import useLocalStorageSync from '../hooks/useLocalStorageSync';

/*function useSpotifyToken() {
    return useQuery(['token'], () => getSpotifyToken());
}*/

function useSpotifyApiRequest<T>(
    params: object,
    token: string | null,
    apiPath: string
) {
    return useQuery(
        ['spotify', params, apiPath],
        () => getSpotifyApi<T>(params, token as string, apiPath),
        { enabled: !!token }
    );
}

export function useSpotifyPlaylistRequest(token: string | null) {
    const TEST_PLAYLIST_URL = 'playlists/4dCrUKnLCNoAnbAz65uMDS';
    const query = {
        additional_types: 'track',
        market: 'GB',
    };

    return useSpotifyApiRequest<GetPlaylistResponse>(
        query,
        token,
        TEST_PLAYLIST_URL
    );
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

export function useRefreshTokenQuery(
    tokenExpired: boolean,
    refreshToken: string
) {
    return useQuery(
        ['spotify', refreshToken],
        () => postRefreshToken(refreshToken),
        {
            enabled: tokenExpired,
        }
    );
}

export function useSpotifyToken() {
    const [localToken] = useLocalToken();
    const { data } = useRefreshTokenQuery(
        Boolean(
            localToken &&
                localToken.expiryDate.getUTCMilliseconds() > Date.now()
        ),
        localToken ? localToken.refreshToken : ''
    );
    if (localToken && localToken.expiryDate.getUTCMilliseconds() < Date.now()) {
        return localToken;
    } else if (
        localToken &&
        localToken.expiryDate.getUTCMilliseconds() < Date.now()
    ) {
        return;
    }

    return null;
}

export function useLocalToken() {
    return useLocalStorageSync<StoredToken | null>('spotify-token', null);
}

export function useLocalSpotifyState() {
    return useLocalStorageSync<string | null>('spotify-state', null);
}
