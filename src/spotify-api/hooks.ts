import axios from 'axios';
import spotify from '../../config.json';
import qs from 'qs';
import path from 'path';
import { useQuery } from '@tanstack/react-query';
import { GetPlaylistResponse } from './types';

async function getSpotifyToken() {
    const AUTH_URL = 'https://accounts.spotify.com/api/token';
    const { clientId, clientSecret } = spotify;
    const { data } = await axios.post(
        AUTH_URL,
        qs.stringify({
            grant_type: 'client_credentials',
        }),
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    new Buffer(clientId + ':' + clientSecret).toString(
                        'base64'
                    ),
            },
        }
    );
    return data.access_token;
}

function useSpotifyToken() {
    return useQuery(['token'], () => getSpotifyToken());
}

function getSpotifyApi<T>(params: object, token: string, apiPath: string) {
    const BASE_URL = 'https://api.spotify.com/v1/';
    const url = path.join(BASE_URL, apiPath);
    return axios
        .get<T>(url, {
            params,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then((res) => res.data);
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
