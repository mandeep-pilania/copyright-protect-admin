import { Component } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent {
  captchaSolved = false;

  onCaptchaResolved(token: string) {
    if (token) {
      this.captchaSolved = true;
      // Optionally: send token to backend for verification
    }
  }
}
