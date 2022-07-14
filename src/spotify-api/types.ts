export type Track = {
    name: string;
    album: Album;
    artists: Artist[];
};

type PlaylistTrack = {
    track: Track;
};

type AlbumType = 'album' | 'single' | 'compilation';

type Album = {
    album_type: AlbumType;
    href: string;
    images: AlbumImage[];
    name: string;
};

export type AlbumImage = {
    height: number;
    width: number;
    url: string;
};

type Artist = { name: string };

export type GetPlaylistResponse = {
    tracks: { items: PlaylistTrack[] };
};

const test = {
    album: {
        album_type: 'album',
        artists: [
            {
                external_urls: {
                    spotify:
                        'https://open.spotify.com/artist/5wPoxI5si3eJsYYwyXV4Wi',
                },
                href: 'https://api.spotify.com/v1/artists/5wPoxI5si3eJsYYwyXV4Wi',
                id: '5wPoxI5si3eJsYYwyXV4Wi',
                name: 'N.E.R.D',
                type: 'artist',
                uri: 'spotify:artist:5wPoxI5si3eJsYYwyXV4Wi',
            },
        ],
        external_urls: {
            spotify: 'https://open.spotify.com/album/5u8ri4s76Ew14IwGOJf5hI',
        },
        href: 'https://api.spotify.com/v1/albums/5u8ri4s76Ew14IwGOJf5hI',
        id: '5u8ri4s76Ew14IwGOJf5hI',
        images: [
            {
                height: 640,
                url: 'https://i.scdn.co/image/ab67616d0000b273fdab242b02783baa895a5a70',
                width: 640,
            },
            {
                height: 300,
                url: 'https://i.scdn.co/image/ab67616d00001e02fdab242b02783baa895a5a70',
                width: 300,
            },
            {
                height: 64,
                url: 'https://i.scdn.co/image/ab67616d00004851fdab242b02783baa895a5a70',
                width: 64,
            },
        ],
        name: 'In Search Of...',
        release_date: '2002-03-12',
        release_date_precision: 'day',
        total_tracks: 12,
        type: 'album',
        uri: 'spotify:album:5u8ri4s76Ew14IwGOJf5hI',
    },
    artists: [
        {
            external_urls: {
                spotify:
                    'https://open.spotify.com/artist/5wPoxI5si3eJsYYwyXV4Wi',
            },
            href: 'https://api.spotify.com/v1/artists/5wPoxI5si3eJsYYwyXV4Wi',
            id: '5wPoxI5si3eJsYYwyXV4Wi',
            name: 'N.E.R.D',
            type: 'artist',
            uri: 'spotify:artist:5wPoxI5si3eJsYYwyXV4Wi',
        },
    ],
    disc_number: 1,
    duration_ms: 259493,
    episode: false,
    explicit: true,
    external_ids: {
        isrc: 'USVI20100624',
    },
    external_urls: {
        spotify: 'https://open.spotify.com/track/2OQfyddAKv4FyelDJjGNHH',
    },
    href: 'https://api.spotify.com/v1/tracks/2OQfyddAKv4FyelDJjGNHH',
    id: '2OQfyddAKv4FyelDJjGNHH',
    is_local: false,
    is_playable: true,
    name: 'Rockstar',
    popularity: 51,
    preview_url: null,
    track: true,
    track_number: 10,
    type: 'track',
    uri: 'spotify:track:2OQfyddAKv4FyelDJjGNHH',
};
