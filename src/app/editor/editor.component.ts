import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  buttons = [
    'bold',
    'italic',
    'underline',
    'fontSize',
    'insertunorderedlist',
    'insertOrderedList',
    'justifyleft',
    'justifycenter',
    'justifyright',
    'undo',
    'redo',
    'link',
    'image',
	];

  @ViewChild('editor') content!: ElementRef;
	@Output() outputRichText = new EventEmitter<string>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {}

	format(style: string, value?: string): void {
		this.document.execCommand(style, false, value ? value : '' );
	}

  output(): void {
    this.outputRichText.emit(this.content.nativeElement.innerHTML);
	}

  addLink(): void {
    const url = prompt('Enter a URL:', 'https://');
    var text = this.document.getSelection();

    const link = '<a href="' + url + '" target="_blank">' + text + '</a>';

    this.document.execCommand('insertHTML', true, link);
  }

  addImage(event: any): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (files.length > 0){
      const src = URL.createObjectURL(files[0]);
      const width = 'width: 300px';
      const img = "<img style='" + width + "' src='" + src + "'>";

      this.document.execCommand('insertHTML', true, img);
    }
  
  }
}
