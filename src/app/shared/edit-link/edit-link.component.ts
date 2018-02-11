import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppState} from '../../reducers';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Store} from '@ngrx/store';
import {LinkModel} from '../../models/link.model';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-edit-link',
  templateUrl: './edit-link.component.html',
  styleUrls: ['./edit-link.component.scss']
})
export class EditLinkComponent implements OnInit {

  form: FormGroup;

  public splitString: string = 'https://s2.googleusercontent.com/s2/favicons?domain=';

  public link: LinkModel;

  public linkId: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<EditLinkComponent>,
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: LinkModel
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      title: '',
      url: '',
      description: '',
      favicon: ''
    });

    this.afs.collection<LinkModel>('links').snapshotChanges().subscribe(links => {
      const dataRef = links.filter(link => (this.data.url === link.payload.doc.data().url));

      if (dataRef.length) {
        this.link = <LinkModel>dataRef[0].payload.doc.data();
        this.linkId = dataRef[0].payload.doc.id;

        const splitIcon = this.link.favicon.split(this.splitString);
        const favIcon = splitIcon.length === 2 ? splitIcon[1] : '';

        this.form.patchValue({
          title: this.link.title,
          url: this.link.url,
          description: this.link.description,
          favicon: favIcon
        });
      }
    });
  }

  editLink() {

    const { title, url, description, favicon } = this.form.value;

      const link: LinkModel = {
        title, url, description, uid: this.link.uid, favicon: this.splitString + favicon
      };

      const ref = this.afs.doc<LinkModel>('links/' + this.linkId);

      ref.update(link)
        .then(() => this.dialogRef.close(link))
        .catch(error => {
        this.dialogRef.close(null);
      });
  }

  delete() {
    const ref = this.afs.doc<LinkModel>('links/' + this.linkId);
    ref.delete().then(() => {
      this.dialogRef.close(true);
    }).catch(error => this.dialogRef.close(null));
  }

}
