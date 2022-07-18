import { Swipe } from './Swipe';

import { Track } from '../../../spotify-api';

import React from 'react';

import { fireEvent, render } from '@testing-library/react';

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
    test('repeats on last track', () => {
        const mockTracks: Track[] = [mockTrack(0), mockTrack(1), mockTrack(2)];

        const component = render(<Swipe tracks={mockTracks} />);
        fireEvent.click(component.getByTestId('swipe-right'));
        fireEvent.click(component.getByTestId('swipe-right'));
        fireEvent.click(component.getByTestId('swipe-right'));
        //I think framer motion is causing there to be two of these initially
        console.log(component.getByTestId('track-name'));
        console.log(component.getByTestId('track-artist-name'));
        expect(component.getByTestId('track-name')).toHaveTextContent(
            mockTracks[0].name
        );
    });
});
