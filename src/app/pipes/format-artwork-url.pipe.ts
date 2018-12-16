import { Pipe, PipeTransform } from '@angular/core';
import { stringInputToObject } from '@ctrl/tinycolor';

declare var MusicKit: any;

@Pipe({
  name: 'formatArtworkUrl'
})
export class FormatArtworkUrlPipe implements PipeTransform {

  transform(artworkUrl: string, desiredDimension: number): string {
    if (!artworkUrl) {
      return './assets/default.jpeg';
    }
    const re = new RegExp('[0-9]{2,4}x[0-9]{2,4}');
    if (re.test(artworkUrl)) {
      artworkUrl = artworkUrl.replace(re, desiredDimension.toString() + 'x' + desiredDimension.toString());
    }
    return MusicKit.formatArtworkURL({ 'url': artworkUrl }, desiredDimension, desiredDimension);
  }
}
