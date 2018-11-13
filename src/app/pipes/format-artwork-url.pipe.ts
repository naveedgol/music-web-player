import { Pipe, PipeTransform } from '@angular/core';

declare var MusicKit: any;

@Pipe({
  name: 'formatArtworkUrl'
})
export class FormatArtworkUrlPipe implements PipeTransform {

  transform( artworkUrl: string, desiredDimension: number ): string {
    if ( !artworkUrl ) {
      return '../../assets/default.jpeg';
    }
    return MusicKit.formatArtworkURL( { 'url': artworkUrl }, desiredDimension, desiredDimension );
  }

}
