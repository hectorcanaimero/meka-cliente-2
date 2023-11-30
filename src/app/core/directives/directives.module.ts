import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimValueDirective } from './trim-value.directive';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';



@NgModule({
  declarations: [
    TrimValueDirective,
    ScrollToBottomDirective
  ],
  exports: [
    TrimValueDirective,
    ScrollToBottomDirective
  ],
  imports: [
    CommonModule,
  ]
})
export class DirectivesModule { }
