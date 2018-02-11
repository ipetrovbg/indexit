import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatTableModule,
  MatListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';
import { AddNewLinkComponent } from './add-new-link/add-new-link.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditLinkComponent } from './edit-link/edit-link.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  declarations: [AddNewLinkComponent, EditLinkComponent],
  providers: [],
  exports: [
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  entryComponents: [AddNewLinkComponent, EditLinkComponent]
})
export class SharedModule { }
