import { AfterViewInit, Component, ViewChild, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'parser';
  @ViewChild('jsonInput', {static: false}) jsonInput: HTMLInputElement;
  @ViewChild('textInputs', {static: false}) textInputs: ElementRef;
  jsonDataDisplay;
  jsonData;
  inputArray: Array<HTMLInputElement>;
  foundResults: Array<number> = [];

  constructor(private renderer2: Renderer2, private elementRef: ElementRef) { }

  getJsonData(data) {
    // needs to remove html element tags and &nbsp; type elements
    this.jsonData = JSON.parse(data);
    this.jsonDataDisplay = JSON.parse(data);
  }

  addNewInput() {
    const inputElem = this.renderer2.createElement('input');
    inputElem.classList.add('form-control', 'mt-2');

    this.renderer2.appendChild(this.textInputs.nativeElement, inputElem);
  }

  searchStrings() {
    this.foundResults = [];
    this.inputArray = Array.from(this.textInputs.nativeElement.children);

    this.inputArray.map(elem => {
      for (const key in this.jsonData) {
        if (Object.prototype.hasOwnProperty.call(this.jsonData, key)) {
          const jsonValue = this.jsonData[key];
          if (jsonValue === elem.value) {
            this.foundResults.push(+key);
          }
        }
      }
    });
  }
}
