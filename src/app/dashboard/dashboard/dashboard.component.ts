import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {LinkModel} from '../../models/link.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AngularFirestore} from 'angularfire2/firestore';
import {getState} from '../../app.state';
import {AppState} from '../../reducers';
import {Store} from '@ngrx/store';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";
import {AddNewLinkComponent} from '../../shared/add-new-link/add-new-link.component';
import {EditLinkComponent} from '../../shared/edit-link/edit-link.component';
import {User} from '../../models/user.model';

declare const chrome: any;
declare const document: any;
declare const window: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('url') urlElement: ElementRef;

  links: Observable<Array<LinkModel>>;

  displayedColumns = ['favicon', 'title', 'url', 'copy'];

  dataSource = new MatTableDataSource([]);

  user: Observable<User>;

  menu: boolean = false;

  selectedLink: LinkModel;

  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(
    public afAuth: AngularFireAuth,
    private af: AngularFirestore,
    private store: Store<AppState>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.user = this.store.select(state => state.user);
    this.af
      .collection<LinkModel>('links', ref => ref.where('uid', '==', getState(this.store).user.uid))
      .valueChanges().subscribe(links => this.dataSource.data = links);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  applyFilter(value) {
    value = value.trim(); // Remove whitespace
    value = value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = value;
  }

  addNewLink() {
    const dialogRef = this.dialog.open(AddNewLinkComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result)
        this.af.collection<LinkModel>('links').add(result);
    });
  }

  selectRow(row) {
    const dialogRef = this.dialog.open(EditLinkComponent, {
      width: '350px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onOpen(link: LinkModel) {
    const currentTab = {
      active: true,
      currentWindow: true
    };
    chrome.tabs.query(currentTab, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'open-url', data: link}, {}, (response) => {});
    });
  }

  copyContent({e, item}: {e: any, item: LinkModel}) {
    this.urlElement.nativeElement.value = item.url;
    this.urlElement.nativeElement.select();
    document.execCommand('copy');
    this.snackBar.open('Copied to clipboard', null, {
      duration: 2000,
    });
  }

}
