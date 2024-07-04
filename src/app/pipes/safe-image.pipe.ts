import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeImage',
  standalone: true
})
export class SafeImagePipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(url?: string): SafeResourceUrl {

    if (url) {
      return this._sanitizer.bypassSecurityTrustUrl(url);
    } else {
      return this._sanitizer.bypassSecurityTrustResourceUrl('./assets/question.svg')
    }

  }
}
