import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseOrderContainerComponent } from './release-order-container.component';

describe('ReleaseOrderContainerComponent', () => {
  let component: ReleaseOrderContainerComponent;
  let fixture: ComponentFixture<ReleaseOrderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseOrderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseOrderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
