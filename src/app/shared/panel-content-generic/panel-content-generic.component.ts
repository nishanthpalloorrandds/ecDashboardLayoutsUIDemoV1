import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule, LineSeriesService, CategoryService, LegendService, TooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-panel-content-generic',
  standalone: true,
  imports: [CommonModule, ChartModule],
  providers: [LineSeriesService, CategoryService, LegendService, TooltipService],
  templateUrl: './panel-content-generic.component.html',
  styleUrls: ['./panel-content-generic.component.css']
})
export class PanelContentGenericComponent {
  public salesChartData: any[] = [];
  public salesChartPrimaryXAxis: any = { valueType: 'Category', title: 'Month' };
  public salesChartPrimaryYAxis: any = { title: 'Sales', labelFormat: '{value}' };
  public salesChartTitle: string = 'Sales Performance';
  @Input() panelId!: string;
  public customText: string = '';
  public panelData: any[] = [];
  public loading: boolean = false;
  public loaderImg: string = 'https://i.gifer.com/ZZ5H.gif'; // public loader image
  public panelsFromSeeded: any = [
    {id:'MyRecentTasks',sizeX:1,sizeY:1,row:0,col:0, customText:"My Recent Tasks"},
    {id:'MyRecentLeads',sizeX:1,sizeY:1,row:0,col:1, customText:"My Leads"},
    {id:'OrderSummary',sizeX:1,sizeY:1,row:0,col:2, customText:"Order Symmary"},
    {id:'LeadSummary',sizeX:1,sizeY:1,row:1,col:0, customText:"Lead Summary"},
    {id:'SalesPerformance',sizeX:1,sizeY:1,row:1,col:1, customText:"Sales Performance"},
    {id:'SalesAvg',sizeX:1,sizeY:1,row:1,col:2, customText:"Sales Average"}
  ];

  ngOnInit() {
    const match = this.panelsFromSeeded.find((p: any) => p.id === this.panelId);
    this.customText = match ? match.customText : '';
    this.fetchPanelData(this.panelId);
    if (this.panelId === 'SalesPerformance') {
      this.salesChartData = [
        { month: 'July', sales: 10000, target: 12000 },
        { month: 'August', sales: 15000, target: 14000 },
        { month: 'September', sales: 13000, target: 15000 }
      ];
    }
  }

  fetchPanelData(panelId: string) {
    this.loading = true;
    setTimeout(() => {
      this.panelData = this.getPanelData(panelId);
      this.loading = false;
    }, 500); // Simulate API delay
  }

  //This will call a middle layer api instead. From there it will call respective specific apis and retun results
  getPanelData(panelId: string): any[] {
    switch(panelId) {
      case 'MyRecentTasks':
        return [
          { task: 'Call client', due: '20-09-2025', status: 'Pending' },
          { task: 'Send invoice', due: '21-09-2025', status: 'Done' },
          { task: 'Prepare report', due: '22-09-2025', status: 'In Progress' }
        ];
      case 'MyRecentLeads':
        return [
          { lead: 'Acme Corp', contact: 'John Doe', stage: 'Qualified' },
          { lead: 'Beta Inc', contact: 'Jane Smith', stage: 'Contacted' },
          { lead: 'Gamma LLC', contact: 'Bob Lee', stage: 'New' }
        ];
      case 'OrderSummary1':
        return [
          { orderId: 'ORD001', amount: 1200, status: 'Shipped' },
          { orderId: 'ORD002', amount: 800, status: 'Pending' },
          { orderId: 'ORD003', amount: 1500, status: 'Delivered' }
        ];
      case 'LeadSummary':
        return [
          { lead: 'Acme Corp', value: 5000, probability: '80%' },
          { lead: 'Beta Inc', value: 3000, probability: '60%' },
          { lead: 'Gamma LLC', value: 7000, probability: '90%' }
        ];
      case 'SalesPerformance':
        return [
          { month: 'July', sales: 10000, target: 12000 },
          { month: 'August', sales: 15000, target: 14000 },
          { month: 'September', sales: 13000, target: 15000 }
        ];
      case 'SalesAvg':
        return [
          { region: 'North', avg: 1200, count: 10 },
          { region: 'South', avg: 1500, count: 12 },
          { region: 'East', avg: 1100, count: 8 }
        ];
      default:
        return [];
    }
  }
}
