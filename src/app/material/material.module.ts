import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';

const MaterialComponents=[MatSlideToggleModule,
                          MatCardModule,
                          MatIconModule,
                          MatToolbarModule
                        ]
@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
