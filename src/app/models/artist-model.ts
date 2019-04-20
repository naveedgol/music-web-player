export class ArtistModel {
    attributes: ArtistAttributes;
    id: string;
    type: string;
    href: string;
}

export class ArtistAttributes {
    url: string;
    name: string;
    genreNames: any;
}