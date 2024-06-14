import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from "@angular/core";

@Directive({
  selector: "[debounceClick]",
})
export class DebounceClickDirective implements AfterViewInit, OnDestroy {
  @Input() debounceTime: number = 500;

  constructor(private el: ElementRef<HTMLButtonElement>) {}

  ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener("click", () => void 0);
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.addEventListener("click", () => {
      this.el.nativeElement.disabled = true;
      setTimeout(() => {
        this.el.nativeElement.disabled = false;
      }, this.debounceTime);
    });
  }
}
