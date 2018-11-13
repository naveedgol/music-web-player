import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMilliseconds'
})
export class FormatMillisecondsPipe implements PipeTransform {

  transform( totalMilliseconds: number ): string {
    const totalSeconds: number = Math.round( totalMilliseconds / 1000 );
    const minutes: number = Math.floor( totalSeconds / 60 );
    const seconds: number = totalSeconds % 60;
    return minutes + ':' + seconds.toString().padStart( 2, '0' );
  }

}
