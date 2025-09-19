import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContentGenericComponent } from './panel-content-generic.component';

describe('PanelContentGenericComponent', () => {
  let component: PanelContentGenericComponent;
  let fixture: ComponentFixture<PanelContentGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PanelContentGenericComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelContentGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
