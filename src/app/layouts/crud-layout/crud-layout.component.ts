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
  selector: 'app-crud-layout',
  templateUrl: './crud-layout.component.html',
  styleUrls: ['./crud-layout.component.css'],
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
export class CrudLayoutComponent implements OnInit {
  @ViewChild('dialog') public dialogObj!: DialogComponent | any;
  @ViewChild('default_dashboard') public dashboard!: DashboardLayoutComponent;

  constructor() {}

  ngOnInit(): void {}

  public cellSpacing: number[] = [10, 10];
  public cellAspectRatio: number = 100 / 50;
  public panels: PanelModel[] = [
    {
      id: 'w0',
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0,
      content:
        '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">Welcome-0</div>',
    },
  ];

  LoadDashboard(): void {
    let panelsFromDB = [
      {
        id: 'w1',
        sizeX: 1,
        sizeY: 1,
        row: 0,
        col: 0,
        content:
          '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">W1</div>',
      },
      {
        id: 'w2',
        sizeX: 1,
        sizeY: 1,
        row: 0,
        col: 1,
        content:
          '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">W2</div>',
        },
      {
        id: 'w3',
        sizeX: 1,
        sizeY: 1,
        row: 0,
        col: 2,
        content:
          '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">W3</div>',
      },
      {
        id: 'w4',
        sizeX: 1,
        sizeY: 1,
        row: 1,
        col: 1,
        content:
          '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">W4</div>',
      },
    ];

    this.panels = panelsFromDB;
    this.renderPanels();
  }

  renderPanels(): void {
    // Clear old panels
    this.dashboard.removeAll();

    this.dashboard!.panels = this.panels;
    // Add new ones
    // this.panels.forEach((panel: any) => {
    //   // this.dashboard.addPanel(panel);
    //   // this.addCloseEvent(panel.id);
    // });

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
    debugger;
    const offsetParent = (<HTMLElement>event.target)
      .offsetParent as HTMLElement | null;
    if (offsetParent && offsetParent.id) {
      this.dashboard.removePanel(offsetParent.id);
    }
  }

  public restoreModel: any = [];
  public restoreModelStr: any = [];

  onSaveClick(args: any) {
    debugger;
    this.restoreModel = this.dashboard?.serialize();
    this.restoreModelStr = JSON.stringify(this.restoreModel);
    console.log(this.restoreModel);

    // Modifying content for restore testing
    this.restoreModel.forEach((panel: any, index: number) => {
      panel.content = '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">' +
                  panel.id +
                  '</div>';
    });
    
  }

  onrestoreClick(args: any) {
    this.dashboard!.panels = this.restoreModel;this.dashboard!.panels = this.restoreModel;
    // Add new ones
    this.panels.forEach((panel: any) => {
      this.addCloseEvent(panel.id);
    });
  }
}
