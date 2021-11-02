import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NoteService } from '../note.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token = localStorage.getItem("userToken");
  dataService: any = '';
  globaID: any = '';
  constructor(private _AuthService: AuthService, private _NoteService: NoteService) {
    this.dataService = this._AuthService.currentUser.getValue();
  }
  ///add form
  addNote: FormGroup = new FormGroup({
    "title": new FormControl(null, [Validators.required]),
    "desc": new FormControl(null, [Validators.required]),
  });
  //edit form
  editForm: FormGroup = new FormGroup({
    "title": new FormControl(null, [Validators.required]),
    "desc": new FormControl(null, [Validators.required]),
  });
  ///add fun
  addFun(addNote: FormGroup) {
    let addobject = {
      title: addNote.value.title,
      desc: addNote.value.desc,
      citizenID: this.dataService._id,
      token: this.token
    }
    this._NoteService.addNote(addobject).subscribe((response) => {
      if (response.message == 'success') {
        this.getNote();
      }
    })
  }
  // get notes
  noteArray: any[] = [];
  getNote() {
    let getObject = {
      token: this.token,
      userID: this.dataService._id
    }
    this._NoteService.getNotes(getObject).subscribe((res) => {
      if (res.message == "success") {
        this.noteArray = res.Notes
      }
    });
  }
  edit(data: any) {
    this.globaID = data;
  }
  editFun(editForm: FormGroup) {
    let editObj = {
      token: this.token,
      title: editForm.value.title,
      desc: editForm.value.desc,
      NoteID: this.globaID
    }
    console.log(editObj);
    this._NoteService.editNote(editObj).subscribe((response) => {
      if (response.message == 'updated') {
        this.getNote();
      }
    });
  }
  ngOnInit(): void {
    this.getNote();
  }
  //delete fun
  deleteID: any = '';
  del(id: any) {
    this.deleteID = id;
  }
  deleteFun() {
    let deleteObj = {
      token: this.token,
      NoteID: this.deleteID
    }
    this._NoteService.deleteNote(deleteObj).subscribe((response) => {
      if (response.message == "deleted") {
        this.getNote();
      }
    })
  }
}
