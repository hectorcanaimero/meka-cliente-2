import { Injectable } from '@angular/core';
import { Storage, ref, deleteObject, uploadBytes, uploadString,
  uploadBytesResumable, percentage, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

  @Injectable({
  providedIn: 'root'
})

export class FireStorageService {

  uploadPercent!: Observable<any>;
  constructor(private storage: Storage) { }

  async upload (room: string, file: any | null): Promise<any> {
    let url;
    const currentDate = Date.now() + '.png';
    const filename = this.base64ToImage(file);
    const path = `room/${room}/${currentDate}`; {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytesResumable(storageRef, filename);
          this.uploadPercent = percentage(task);
          await task;
          url = await getDownloadURL(storageRef);
        } catch(e: any) {
          console.error(e);
        }
      } else {
        // handle invalid file
      }
      return url;
    }
  };

  async uploadService(name: string, file: any | null): Promise<any> {
    let url;
    const filename = this.base64ToImage(file);
    const path = `services/${Date.now()}-${name}.png`; {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytesResumable(storageRef, filename);
          this.uploadPercent = percentage(task);
          await task;
          url = await getDownloadURL(storageRef);
        } catch(e: any) {
          console.error(e);
        }
      } else {
        // handle invalid file
      }
      return url;
    }
  };

  uploadSoporte = async (room: string, file: any | null): Promise<any> => {
    let url;
    const currentDate = Date.now() + '.png';
    const filename = this.base64ToImage(file);
    const path = `soporte/${room}/${currentDate}`;
    {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytesResumable(storageRef, filename);
          this.uploadPercent = percentage(task);
          await task;
          url = await getDownloadURL(storageRef);
        } catch(e: any) {
          console.error(e);
        }
      } else {
        // handle invalid file
      }
      return url;
    }
  };
  uploadAudio = async (room: string, file: any | null): Promise<any> => {
    let url;
    const currentDate = Date.now() + '.wav';
    const path = `room/${room}/${currentDate}`; {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytesResumable(storageRef, file);
          this.uploadPercent = percentage(task);
          await task;
          url = await getDownloadURL(storageRef);
        } catch(e: any) {
          console.error(e);
        }
      } else {
        // handle invalid file
      }
      return url;
    }
  };

  base64ToImage(dataURI: string) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }
}
