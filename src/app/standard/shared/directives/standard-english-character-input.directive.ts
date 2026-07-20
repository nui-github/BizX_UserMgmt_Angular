import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appEnglishCharacterInput]',
  standalone: true
})
export class EnglishCharacterInputDirective {
    private readonly regex: RegExp = new RegExp(/^[a-zA-Z]/);

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const inputChar: string = event.key;
    if (!inputChar || !String(inputChar).match(this.regex)) {
        event.preventDefault();
      }
  }

  @HostListener('paste', ['$event']) onPaste(event: { originalEvent: any; preventDefault: () => void; }){
    const pasteData = (event.originalEvent || event).clipboardData.getData('text/plain');
    if(pasteData){
        const regEX = new RegExp(/^[a-zA-Z]/);
        if(!regEX.test(pasteData)){
            event.preventDefault();
        }
    }
  }

}
