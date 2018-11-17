import { PlayParams } from './play-params';
import { Artwork } from './artwork';

export class SongModel {
    attributes: SongAttributes;
    id: string;
    type: string;
    href: string;
}

export class SongAttributes {
    albumName: string;
    artistName: string;
    durationInMillis: number;
    name: string;
    trackNumber: number;
    playParams: PlayParams;
    artwork: Artwork;
    contentRating: string;
}



