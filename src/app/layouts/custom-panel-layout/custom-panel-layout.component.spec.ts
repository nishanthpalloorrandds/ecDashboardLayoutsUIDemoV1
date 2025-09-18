import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPanelLayoutComponent } from './custom-panel-layout.component';

describe('CustomPanelLayoutComponent', () => {
  let component: CustomPanelLayoutComponent;
  let fixture: ComponentFixture<CustomPanelLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CustomPanelLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPanelLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
