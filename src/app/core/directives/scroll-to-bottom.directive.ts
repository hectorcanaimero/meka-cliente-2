import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]'
})

export class ScrollToBottomDirective {
  constructor(private elementRef: ElementRef) { }

  scrollToBottom = () => {
    const el: HTMLDivElement = this.elementRef.nativeElement;
    el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
  };
}
