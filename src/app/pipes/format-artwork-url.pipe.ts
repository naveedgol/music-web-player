import { Pipe, PipeTransform } from '@angular/core';

declare var MusicKit: any;

@Pipe({
  name: 'formatArtworkUrl'
})
export class FormatArtworkUrlPipe implements PipeTransform {

  transform(artworkUrl: string): any {
    return MusicKit.formatArtworkURL( artworkUrl, 60, 60);
  }

}
