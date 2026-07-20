import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumberInput]',
  standalone: true
})
export class NumberInputDirective {
    private readonly regex: RegExp = new RegExp(/^[0-9]*$/);

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace'];
    if (allowedKeys.includes(event.key)) {
      return;
    }
    const inputChar: string = event.key;
    if (!inputChar || !String(inputChar).match(this.regex)) {
        event.preventDefault();
      }
  }

  @HostListener('paste', ['$event']) onPaste(event: { originalEvent: any; preventDefault: () => void; }){
    const pasteData = (event.originalEvent || event).clipboardData.getData('text/plain');
    if(pasteData){
        const regEX = new RegExp(/^[0-9]*$/);
        if(!regEX.test(pasteData)){
            event.preventDefault();
        }
    }
  }

}
