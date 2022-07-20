import spotify from '../../config.json';
import axios from 'axios';
import path from 'path';
import qs from 'qs';

type GrantType = 'client_credentials' | 'authorization_code';

export async function getSpotifyTokenFromLogin() {
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

export async function getSpotifyToken() {
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

export function getSpotifyApi<T>(
    params: object,
    token: string,
    apiPath: string
) {
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

export async function getSpotifyAuthToken() {
    //TODO: Dev vs prod .env
    const params = {
        client_id: spotify.clientId,
        response_type: 'code',
        redirect_uri: 'http://localhost:3005/login',
        state: 'test',
    };
}
