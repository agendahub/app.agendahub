import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements AfterViewInit {

  @Input() maxWidth!: number;
  @Input() maxHeight!: number;
  @Input() minWidth!: number;
  @Input() minHeight!: number;

  @Input() minLengthToCollapseable!: number;

  @Input() get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
      this._visible = value;
  }
  
  public text!: string;
  private _visible!: boolean;
  public isCollapseable!: boolean;
  public style!: Record<string, string>;

  @ViewChild('content') content!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.checkContent();
    this.toggle(true);
  }

  public toggle(skip = false) {
    if (!skip) this.visible = !this.visible;
    
    this.style = this.isCollapseable 
      ? {
        'max-width': this.visible ? "95%" : `${this.minWidth + "px" ?? "95%" }`,
        'max-height': this.visible ? "100%" : `${this.minHeight + "px" ?? "2rem" }`,
      }
      : {
        'max-width': '95%',
        'max-height': '100%'
      };
    
    this.text = this.visible ? 'Ver menos' : 'Ver mais';
  }

  private checkContent() {
    if (this.content) {
      const content = this.content.nativeElement as HTMLElement;
      this.isCollapseable = (content.textContent?.length ?? 0) > this.minLengthToCollapseable || 
                              (typeof this.maxHeight == "number" && content.clientHeight > this.maxHeight || content.querySelector('img') !== null);

      if (this.isCollapseable && (typeof this.minHeight == "number" && content.clientHeight <= this.minHeight)) {
        this.isCollapseable = false;
      }
    }
  }
}


