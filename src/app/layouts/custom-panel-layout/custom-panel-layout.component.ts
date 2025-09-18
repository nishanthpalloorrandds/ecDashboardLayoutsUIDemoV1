
import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  ViewChild,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  DashboardLayoutAllModule,
  DashboardLayoutComponent,
  PanelModel,
  DashboardLayoutModule,
} from '@syncfusion/ej2-angular-layouts';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-custom-panel-layout',
  templateUrl: './custom-panel-layout.component.html',
  styleUrls: ['./custom-panel-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    DashboardLayoutAllModule,
    DashboardLayoutModule,
    CommonModule,
    DialogModule,
    ButtonModule,
  ],
})
export class CustomPanelLayoutComponent implements OnInit {
  @ViewChild('dialog') public dialogObj!: DialogComponent | any;
  @ViewChild('default_dashboard') public dashboard!: DashboardLayoutComponent;

  
  constructor() {}

  ngOnInit(): void {
setTimeout(() => {
  this.FirstLoadDashboardFromAPI ();
}, 200);

  }

  public cellSpacing: number[] = [10, 10];
  public cellAspectRatio: number = 100 / 90;
  public panels: PanelModel[] = [];

  public restoreModel: any = [];
  public restoreModelStr: any = [];

  public panelsFromSeeded: any = [
    {id:'W1',sizeX:1,sizeY:1,row:0,col:0,content:'<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">W1</div>'},
          {id:'W2',sizeX:1,sizeY:1,row:0,col:1,content:'<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">W2</div>'},
          {id:'W3',sizeX:1,sizeY:1,row:0,col:2,content:'<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">W3</div>'},
          {id:'W4',sizeX:1,sizeY:1,row:1,col:0,content:'<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">W4</div>'},
          {id:'W5',sizeX:1,sizeY:1,row:1,col:1,content:'<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">W5</div>'},
          {id:'W6',sizeX:1,sizeY:1,row:1,col:2,content:'<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">W6</div>'}
  ]
  public panelsOfThisUserFromAPI: any = [
        ];

public panelsGallery: any = [
]
public Message: string = "Ready";

  FirstLoadDashboardFromAPI(): void {
    this.panels = this.panelsOfThisUserFromAPI = this.panelsFromSeeded;
    this.panelsGallery = [];
    this.renderPanels();
  }

  renderPanels(): void {
    // Clear old panels
    this.dashboard.removeAll();

    this.dashboard!.panels = this.panels;
   
    //Add close events for all (Or find with class and attach events)
    setTimeout(() => {
      this.panels.forEach((panel: any) => {
        this.addCloseEvent(panel.id);
      });
    }, 500);
  }

  addWidget(panelId: string): void {
    let panel: PanelModel = {
      id: panelId,
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0,
      content:
        '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">' +
        panelId +
        '</div>',
    };

    this.dashboard.addPanel(panel);

    this.addCloseEvent(panelId);

    // Remove from gallery
    this.panelsGallery = this.panelsGallery.filter((p: any) => p.id !== panelId);
  }

  setCloseEventToAll(): void {
    setTimeout(() => {
      const closeIcons: any = document.querySelector('.e-close-icon');
      if (closeIcons.length > 0) {
        closeIcons.forEach((closeIcon: any) => {
          closeIcon.removeEventListener('click');
          closeIcon.addEventListener('click', this.onCloseIconHandler.bind(this));
        });
      }
    }, 500);      
  }
  

  onSaveClick(args: any) {
    this.saveToAPI();
    
  }

  saveToAPI(){
    this.panelsOfThisUserFromAPI = this.dashboard?.serialize();
    this.restoreModelStr = JSON.stringify(this.panelsOfThisUserFromAPI);
    console.log(this.panelsOfThisUserFromAPI);

     // Modifying content for restore testing
    this.panelsOfThisUserFromAPI.forEach((panel: any, index: number) => {
      panel.content = '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">' +
                  panel.id +
                  '</div>';
    });
    this.Message = "Saved at " + new Date().toLocaleTimeString();
  }

  onReloadFromAPIClick(args: any) {
    this.dashboard!.panels = this.panelsOfThisUserFromAPI;

    // Reset panelsGallery to those in panelsFromSeeded not present in panelsFromAPI
    const apiIds = new Set((this.panelsOfThisUserFromAPI || []).map((p: any) => p.id));
    this.panelsGallery = this.panelsFromSeeded.filter((seed: any) => !apiIds.has(seed.id));

    // Attach events
    setTimeout(() => {
      this.panels.forEach((panel: any) => {
        this.addCloseEvent(panel.id);
      });
    }, 500);

    this.Message = "Reloaded at " + new Date().toLocaleTimeString();
  }

  addCloseEvent(panelId: string): void {
    const panelElement = document.getElementById(panelId);
    if (panelElement) {
      const closeIcon: any = panelElement.querySelector('.e-close-icon');
      if (closeIcon) {
        closeIcon.addEventListener('click', this.onCloseIconHandler.bind(this));
      }
    }
  }

  onCloseIconHandler(event: any): void {
    const offsetParent = (<HTMLElement>event.target)
      .offsetParent as HTMLElement | null;
    if (offsetParent && offsetParent.id) {
      this.dashboard.removePanel(offsetParent.id);
      this.addToPanelGallery(offsetParent.id);
    }
  }

  addToPanelGallery(panelId: string): void {
    if(this.panelsGallery.find((p: any) => p.id === panelId)){
      return;
    }

    let panel: PanelModel = {
      id: panelId,
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0,
      content:
        '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">' +
        panelId +
        '</div>',
    };
debugger;
    this.panelsGallery.push(panel);
  }
}
