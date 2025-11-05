import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent { }