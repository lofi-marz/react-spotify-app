import spotify from '../../config.json';
import axios from 'axios';
import path from 'path';
import qs from 'qs';
import { PostTokenResponse, StoredToken } from './types';

type GrantType = 'client_credentials' | 'authorization_code';

export async function getSpotifyTokenFromLogin(
    code: string,
    codeVerifier: string
) {
    const AUTH_URL = 'https://accounts.spotify.com/api/token';
    //TODO: Now that I think about it this is bad since they can access the secret locally
    const { clientId, clientSecret } = spotify;
    const { data } = await axios.post<PostTokenResponse>(
        AUTH_URL,
        qs.stringify({
            grant_type: 'authorization_code',
            code,
            client_id: clientId,
            code_verifier: codeVerifier,
            redirect_uri: 'http://localhost:3005/login',
        }),

        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    return data;
}

export async function getSpotifyToken() {
    const AUTH_URL = 'https://accounts.spotify.com/api/token';
    const { clientId, clientSecret } = spotify;

    const { data } = await axios.post<{ access_token: string }>(
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
    console.log(data);
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

export async function postRefreshToken(oldToken: string) {
    const AUTH_URL = 'https://accounts.spotify.com/api/token';

    const { clientId } = spotify;
    const { data } = await axios.post<{ access_token: string }>(
        AUTH_URL,
        qs.stringify({
            grant_type: 'authorization_code',
            refresh_token: oldToken,
            client_id: clientId,
        }),

        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    return data;
}

export function createStoredToken(
    tokenResponse: PostTokenResponse
): StoredToken {
    return {
        accessToken: tokenResponse.access_token,
        tokenType: tokenResponse.token_type,
        scope: tokenResponse.scope,
        expiryDate: new Date(
            new Date().getTime() + tokenResponse.expires_in * 1000
        ),
        refreshToken: tokenResponse.refresh_token,
    };
}
