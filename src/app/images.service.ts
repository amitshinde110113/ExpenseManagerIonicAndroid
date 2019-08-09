import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor() { }
getImageAsString(url)
{ 
 
  this.getBase64ImageFromURL(url).subscribe( async(base64data) => {    
   
    let base64Image  
return  base64Image  = await 'data:image/jpg;base64,' + base64data;
  });
}
    
getBase64ImageFromURL(url: string) {
  return Observable.create((observer: Observer<string>) => {
    // create an image object
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
        observer.next(this.getBase64Image(img));
        observer.complete();
      };
      img.onerror = (err) => {
         observer.error(err);
      };
    } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
    }
  });
}

getBase64Image(img: HTMLImageElement) {
  // We create a HTML canvas object that will create a 2d image
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  // This will draw image    
  ctx.drawImage(img, 0, 0);
  // Convert the drawn image to Data URL
  var dataURL = canvas.toDataURL("image/jpeg",0.1);
return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
}
