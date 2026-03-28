import { Component } from '@angular/core';

/* Components */
import { Copyright } from './copyright/copyright';
import { SocialMedia } from './social-media/social-media';

@Component({
  selector: 'app-footer',
  imports: [Copyright, SocialMedia],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
