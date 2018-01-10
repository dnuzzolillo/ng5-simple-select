import { Component, EventEmitter, Input, Output, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { OptionFilterPipe } from '../../pipe/option-filter.pipe'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() options : Array<any>;
  @Input() placeholder : string;
  @Output() onSelect = new EventEmitter<any>();
  @ViewChild('selector') selector: ElementRef; 
  @ViewChild('input') input: ElementRef; 
  @ViewChild('list') list: ElementRef; 
  display_list:boolean = false;
  items_selected = 0;
  selected_items:Array<any> = [];
  filter:string;
  select(item, i){
    //this.list_hovered = false;
    this.onSelect.emit(item);
    this.filter = '';
    this.selected_items.push(item);
    this.items_selected++;
    for(let x in this.options){
      if(this.options[x].id == item.id){
        this.options.splice(parseInt(x), 1)
        return false;
      }
    }
  }

  delete(item, i){
    this.selected_items.splice(i, 1);
    this.options.push(item);
  }

  close(){
    console.log(this.list_hovered)
    if(!this.list_hovered){
      this.display_list = false;
    }
  }

  place_holder(){
    if(this.items_selected < 1){
      return this.placeholder
    }else{
      return '';
    }
  }

  keepopen(i){
    this.hover = i;
    if(this.display_list){
      this.list_hovered = true;
    }else{
      this.list_hovered = false;
    }
  }

  list_hovered:boolean;

  options_array(){

    if (!this.options || !this.filter) {
        return this.options;
    }
    return this.options.filter(item => item.text.toLowerCase().indexOf(this.filter.toLowerCase()) != -1);
    
  }

  key(e){

    if(e.keyCode == 40 && this.hover < (this.list.nativeElement.childNodes.length - 4)){
      this.hover++;
      console.log(this.list.nativeElement.childNodes[this.hover + 2].offsetTop)
      console.log(this.list.nativeElement.scrollTop)
      
      if(this.list.nativeElement.childNodes[this.hover + 3].offsetTop > (this.list.nativeElement.scrollTop + this.list.nativeElement.offsetHeight)){
        this.list.nativeElement.scrollTop = 
      ((this.list.nativeElement.childNodes[this.hover + 2].offsetTop + this.list.nativeElement.childNodes[this.hover + 2].offsetHeight) - this.list.nativeElement.offsetHeight)
      }
      
      return false;
    }
    if(e.keyCode == 38 && this.hover > 0){
      this.hover--;
      if(this.list.nativeElement.childNodes[this.hover + 1].offsetTop < (this.list.nativeElement.scrollTop)){
        this.list.nativeElement.scrollTop = 
      (this.list.nativeElement.childNodes[this.hover + 3].offsetTop - this.list.nativeElement.childNodes[this.hover + 2].offsetHeight))
      }
      
      return false;
    
    }

    if(e.keyCode == 13){
      this.select(this.options_array()[this.hover], this.hover);
      return false;
    }
    this.options_array();
    this.hover = 0;
  }
  hover:number = 0;
  ishover(i){
    
    return this.hover === i;
  }
  private filterPipe:OptionFilterPipe 
  constructor(
    private element:ElementRef, 
    private renderer:Renderer2,
    
  ) { }

  ngOnInit() {
  }

}
