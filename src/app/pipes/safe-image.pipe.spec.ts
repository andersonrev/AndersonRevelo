import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SafeImagePipe } from './safe-image.pipe';

describe('SafeImagePipe', () => {
  let pipe: SafeImagePipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SafeImagePipe],
      providers: [
        {
          provide: DomSanitizer,
          useValue: { bypassSecurityTrustUrl: (url: string) => `safe:${url}` as SafeUrl }
        }
      ]
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeImagePipe(sanitizer);
  });

 
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize the URL', () => {
    const url = 'https://devsu.com/image.png';
    const sanitizedUrl = pipe.transform(url);
    expect(sanitizedUrl).toBe(`safe:${url}`);
  });
});
