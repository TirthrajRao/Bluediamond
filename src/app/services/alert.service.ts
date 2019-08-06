import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  successAlert(title) {
    console.log("title==========>",title)
    Swal.fire(
      {
        type: 'success',
        title:title,
        showConfirmButton: false,
        timer: 1000
      }
    )
  }

  failurAlert(message) {
    Swal.fire('Oops...', message, 'error') 
  }
}
