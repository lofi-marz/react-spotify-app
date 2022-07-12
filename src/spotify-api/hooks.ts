import { useEffect, useState } from 'react';
import axios from 'axios';
import spotify from '../../config.json';
import qs from 'qs';

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

export function useSpotifyPlaylistRequest() {
    const TEST_PLAYLIST_URL =
        'https://api.spotify.com/v1/playlists/4dCrUKnLCNoAnbAz65uMDS';
    const query = {
        additional_types: 'track',
        market: 'GB',
    };
    const token = useSpotifyToken();
    useEffect(() => {
        if (!token) return;
        axios
            .get(TEST_PLAYLIST_URL, {
                params: query,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [token]);
}
