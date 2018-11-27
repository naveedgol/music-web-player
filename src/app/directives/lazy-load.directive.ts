import { AfterViewInit, Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit {
  @HostBinding('attr.src') srcAttr = './assets/default.jpeg';
  @Input() src: string;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.lazyLoadImage();
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.srcAttr = this.src;
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }
}
