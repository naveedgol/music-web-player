import { Pipe, PipeTransform } from '@angular/core';

declare var MusicKit: any;

@Pipe({
  name: 'formatArtworkUrl'
})
export class FormatArtworkUrlPipe implements PipeTransform {

  transform(artworkUrl: string, dimension: number): any {
    return MusicKit.formatArtworkURL( artworkUrl, dimension, dimension);
  }

}
