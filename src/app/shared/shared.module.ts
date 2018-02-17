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
  MatDialogModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatCardModule,
} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddNewLinkComponent } from './add-new-link/add-new-link.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditLinkComponent } from './edit-link/edit-link.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

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
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    MalihuScrollbarModule.forRoot()
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
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    MalihuScrollbarModule
  ],
  entryComponents: [AddNewLinkComponent, EditLinkComponent]
})
export class SharedModule { }
