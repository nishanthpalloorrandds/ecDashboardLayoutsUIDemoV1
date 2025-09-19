
import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  AfterViewInit,
  Type
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
import { PanelContentGenericComponent } from '../../shared/panel-content-generic/panel-content-generic.component';

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
export class CustomPanelLayoutComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    // Render panels after the view is initialized
//     setTimeout(() => {
//   this.FirstLoadDashboardFromAPI ();
// }, 200);
  }
  @ViewChild('dialog') public dialogObj!: DialogComponent | any;
  @ViewChild('default_dashboard', { static: true, read: ViewContainerRef })
  public dashboardContainer!: ViewContainerRef;
  @ViewChild('default_dashboard') public dashboard!: DashboardLayoutComponent;
  private panelComponentRefs: { [key: string]: ComponentRef<PanelContentGenericComponent> } = {};

  
  constructor() {}

  ngOnInit(): void {
setTimeout(() => {
  this.FirstLoadDashboardFromAPI ();
}, 100);

  }

  public cellSpacing: number[] = [10, 10];
  public cellAspectRatio: number = 100 / 90;
  public panels: PanelModel[] = [];

  public restoreModel: any = [];
  public restoreModelStr: any = [];

  public panelsFromSeeded: any = [
    {id:'MyRecentTasks',sizeX:1,sizeY:1,row:0,col:0, customText:"My Recent Tasks"},
    {id:'MyRecentLeads',sizeX:1,sizeY:1,row:0,col:1, customText:"My Leads"},
    {id:'OrderSummary',sizeX:1,sizeY:1,row:0,col:2, customText:"Order Symmary"},
    {id:'LeadSummary',sizeX:1,sizeY:1,row:1,col:0, customText:"Lead Summary"},
    {id:'SalesPerformance',sizeX:1,sizeY:1,row:1,col:1, customText:"Sales Performance"},
    {id:'SalesAvg',sizeX:1,sizeY:1,row:1,col:2, customText:"Sales Average"}
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
    // Remove all existing panel component refs
    Object.values(this.panelComponentRefs).forEach(ref => ref.destroy());
    this.panelComponentRefs = {};
    // Remove all panels from dashboard
    this.dashboard.removeAll();
    // Add panels and dynamically create Angular components as content
    this.panels.forEach((panel: any) => {
      const panelConfig = {
        id: panel.id,
        sizeX: panel.sizeX,
        sizeY: panel.sizeY,
        row: panel.row,
        col: panel.col,
        content: '' // Will be replaced by Angular component
      };
      this.dashboard.addPanel(panelConfig);
      // Dynamically create the Angular component inside the panel
      setTimeout(() => {
        const panelElement = document.getElementById(panel.id);
        if (panelElement) {
          // Clear existing content
          //panelElement.innerHTML = '';

          let children = Array.from(panelElement.children);
          panelElement.innerHTML = '';

          // children.forEach(child => panelElement.removeChild(child));

          // Add close icon
          const closeIcon = document.createElement('span');
          closeIcon.className = 'e-template-icon e-close-icon';
          closeIcon.addEventListener('click', this.onCloseIconHandler.bind(this));
          panelElement.appendChild(closeIcon);


          // Create the Angular component
          const ref = this.dashboardContainer.createComponent(PanelContentGenericComponent);
          ref.instance.panelId = panel.id;
          panelElement.appendChild(ref.location.nativeElement);
          this.panelComponentRefs[panel.id] = ref;

          children.forEach(child => {
            if(child.hasAttribute('class') && child.getAttribute('class') === 'e-panel-container'){
              panelElement.appendChild(child);
            }
          });
          
        }
      }, 100);
    });

    // Dynamically create the Angular component inside the panel
      // setTimeout(() => {
      //   this.panels.forEach((panel: any) => {
      //   const panelElement = document.getElementById(panel.id);
      //   if (panelElement) {
      //     // Clear existing content
      //     panelElement.innerHTML = '';

      //     // Add close icon
      //     const closeIcon = document.createElement('span');
      //     closeIcon.className = 'e-template-icon e-close-icon';
      //     closeIcon.addEventListener('click', this.onCloseIconHandler.bind(this));
      //     panelElement.appendChild(closeIcon);


      //     // Create the Angular component
      //     const ref = this.dashboardContainer.createComponent(PanelContentGenericComponent);
      //     ref.instance.panelId = panel.id;
      //     panelElement.appendChild(ref.location.nativeElement);
      //     this.panelComponentRefs[panel.id] = ref;
          
      //   }
      // });
      // }, 400);
  }

  addWidget(panelId: string): void {
    debugger;
    let panel: PanelModel = {
      id: panelId,
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0
    };
    this.panels.push(panel);
    this.renderPanels();
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
    // this.panelsOfThisUserFromAPI.forEach((panel: any, index: number) => {
    //   panel.content = '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">' +
    //               panel.id +
    //               '</div>';
    // });
    this.Message = "Saved at " + new Date().toLocaleTimeString();
  }

  onReloadFromAPIClick(args: any) {
    //this.dashboard!.panels = this.panelsOfThisUserFromAPI;
    this.panels = this.panelsOfThisUserFromAPI;
    this.renderPanels();

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
    let panel: any = {
      id: panelId,
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0
      //customText: this.panelsFromSeeded.find((p: any) => p.id === panelId)?.customText || ''
    };
    this.panelsGallery.push(panel);
  }
}
