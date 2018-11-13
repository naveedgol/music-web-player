import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSeconds'
})
export class FormatSecondsPipe implements PipeTransform {

  transform( totalSeconds: number ): string {
    const minutes: number = Math.floor( totalSeconds / 60 );
    const seconds: number = totalSeconds % 60;
    return minutes + ':' + seconds.toString().padStart( 2, '0' );
  }

}
