import { Directive, ElementRef, Input, Output, EventEmitter, SimpleChanges, HostListener, OnChanges } from '@angular/core';
@Directive({
  selector: '[appEditableDiv]'
})

export class EditableDivDirective implements OnChanges {

  private lastViewModel: string;
  // get and send information, twoway databinding
  // tslint:disable-next-line:no-input-rename
  @Input('appEditableDiv') model: string;
  // tslint:disable-next-line:no-output-rename
  @Output('appEditableDivChange') update = new EventEmitter();
  @HostListener('keyup') onKeyUp() {
    // when a key is up inside a div, call onKeyup Function
    this.onKeyup();
  }
  constructor(private elRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // watch if there are any change in model or div/input
    if (changes['model'] && changes['model'].currentValue !== this.lastViewModel) {
      this.lastViewModel = this.model;
      this.refreshView();
    }
  }

  onKeyup() {
    const value = this.elRef.nativeElement.innerText;
    this.lastViewModel = value;
    // emit the new value for the model
    this.update.emit(parseFloat(value));
  }

  private refreshView() {
    // refresh the view with the new value
    this.elRef.nativeElement.innerText = this.model;
  }
}
