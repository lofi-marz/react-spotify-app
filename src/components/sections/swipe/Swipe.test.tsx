import { Swipe } from './Swipe';

import { Track } from '../../../spotify-api';

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

function mockTrack(id = 0): Track {
    return {
        album: {
            album_type: 'album',
            href: '',
            name: 'Test Album',
            images: [
                {
                    height: 500,
                    width: 500,
                    url: 'https://audioxide.com/api/images/album-artwork/igor-tyler-the-creator-medium-square.jpg',
                },
            ],
        },
        artists: [{ name: `Test Song ${id}` }],
        name: `Test Song ${id}`,
    };
}

describe('Swipe stack', () => {
    test('can swipe left', () => {
        //given
        const mockTracks: Track[] = [mockTrack(0), mockTrack(1), mockTrack(2)];

        render(<Swipe tracks={mockTracks} />);

        //when
        const swipeLeftButton = screen.getByTestId('swipe-left');
        fireEvent.click(swipeLeftButton);

        //then
        expect(screen.getByTestId('track-name')).toHaveTextContent(
            mockTracks[1].name
        );

        expect(screen.getByTestId('track-artist-name')).toHaveTextContent(
            mockTracks[1].artists[0].name
        );
    });
    test('repeats on last track', () => {
        //given
        const mockTracks: Track[] = [mockTrack(0), mockTrack(1), mockTrack(2)];

        render(<Swipe tracks={mockTracks} />);

        //when
        const swipeRightButton = screen.getByTestId('swipe-right');
        fireEvent.click(swipeRightButton);
        fireEvent.click(swipeRightButton);
        fireEvent.click(swipeRightButton);

        //then
        expect(screen.getByTestId('track-name')).toHaveTextContent(
            mockTracks[0].name
        );

        expect(screen.getByTestId('track-artist-name')).toHaveTextContent(
            mockTracks[0].artists[0].name
        );
    });
});
