import { Injectable } from '@angular/core';
import { Firestore, collection, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private fs: Firestore) {}

  createRoom = (id: string, item: any) => {
    setDoc(doc(this.fs, `rooms/${id}`), item);
    setDoc(doc(this.fs, `rooms/${id}/messages`), {});
  };

  acceptRoom(id: string, company: any) {
    const room: any = this.getRoomById(id);
    if(room) {
      const roomDocRef = doc(this.fs, `rooms/${id}`);
      return updateDoc(roomDocRef, { user: room.user, date_reg: room.date_reg, company });
    }
  }

  getRoomById = (id: string) => docData(doc(this.fs, `rooms/${id}`),
    { idField: 'id' }) as Observable<any>;
}
