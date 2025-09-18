import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardLayoutAllModule, DashboardLayoutComponent, PanelModel,DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [DashboardLayoutAllModule,DashboardLayoutModule,CommonModule]
})
export class BasicLayoutComponent implements OnInit {

  @ViewChild('default_dashboard')
    public dashboard!: DashboardLayoutComponent;
    
  constructor() { }

  ngOnInit(): void {
  }

  public count: number = 5;
    public cellSpacing: number[] = [10, 10];
    addPanel(): void {
        let panel: PanelModel[] = [{
            'id': this.count.toString(), 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0, 'zIndex':999,
            content: '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">' + this.count.toString() + '</div>'
        }];
        this.dashboard.addPanel(panel[0]);
        
        const panelElement = document.getElementById(this.count.toString());
        if (panelElement) {
            const closeIcon: any = panelElement.querySelector('.e-close-icon');
            if (closeIcon) {
                closeIcon.addEventListener('click', this.onCloseIconHandler.bind(this));
            }
        }
        this.count = this.count + 1;
    }
    onCloseIconHandler(event: any): void {
        const offsetParent = (<HTMLElement>event.target).offsetParent as HTMLElement | null;
        if (offsetParent && offsetParent.id) {
            this.dashboard.removePanel(offsetParent.id);
        }
    }

}
