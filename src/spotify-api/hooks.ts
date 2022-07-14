import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import spotify from '../../config.json';
import qs from 'qs';
import path from 'path';
import { GetPlaylistResponse } from './types';

function useSpotifyToken() {
    const AUTH_URL = 'https://accounts.spotify.com/api/token';
    const { clientId, clientSecret } = spotify;
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        axios
            .post(
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
            )
            .then((res) => {
                setToken(res.data['access_token']);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    return token;
}

function useSpotifyApiRequest(params: any, apiPath: string) {
    const BASE_URL = 'https://api.spotify.com/v1/playlists/';
    const token = useSpotifyToken();
    const url = path.join(BASE_URL, apiPath);
    const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
    useEffect(() => {
        if (!token) return;
        axios
            .get(url, {
                params,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setResponse(res);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [token]);
    return response;
}

export function useSpotifyPlaylistRequest() {
    const TEST_PLAYLIST_URL =
        'https://api.spotify.com/v1/playlists/4dCrUKnLCNoAnbAz65uMDS';
    const query = {
        additional_types: 'track',
        market: 'GB',
    };
    const token = useSpotifyToken();
    const [response, setResponse] = useState<GetPlaylistResponse | null>(null);
    useEffect(() => {
        if (!token) return;
        axios
            .get<GetPlaylistResponse>(TEST_PLAYLIST_URL, {
                params: query,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setResponse(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [token]);
    return response;
}
