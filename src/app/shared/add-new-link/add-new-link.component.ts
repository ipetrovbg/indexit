import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LinkModel} from "../../models/link.model";
import {getState} from "../../app.state";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {MatDialogRef} from "@angular/material";

declare const chrome: any;

@Component({
  selector: 'app-add-new-link',
  templateUrl: './add-new-link.component.html',
  styleUrls: ['./add-new-link.component.scss']
})
export class AddNewLinkComponent implements OnInit {

  form: FormGroup;
  favIcon: string = ''
  private favIconeDomain: string = 'https://s2.googleusercontent.com/s2/favicons?domain=';

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AddNewLinkComponent>
  ) { }



  ngOnInit() {

    this.form = this.fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      description: '',
    });

    const currentTab = {
      active: true,
      currentWindow: true
    };
    chrome.tabs.query(currentTab, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, 'get-url', {}, (response) => {
        console.log('chrome response', response);
        this.favIcon = `${this.favIconeDomain}${response.url.href}`;
        this.form.patchValue({
          title: response.title,
          description: response.description,
          url: response.url.href
        });
      });
    });
  }

  addNewLink() {
    if (this.form.invalid)
      return;

    const link: LinkModel = {
      title: this.form.value.title,
      url: this.form.value.url,
      description: this.form.value.description,
      favicon: this.favIcon,
      uid: getState(this.store).user.uid
    };
    this.dialogRef.close(link);
  }

}
