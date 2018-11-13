import { PlayParams } from './play-params';
import { Artwork } from './artwork';

export class AlbumModel {
    attributes: AlbumAttributes;
    id: string;
    type: string;
    href: string;
    relationships: any;
}

export class AlbumAttributes {
    artistName: string;
    name: string;
    trackCount: number;
    playParams: PlayParams;
    artwork: Artwork;
}
