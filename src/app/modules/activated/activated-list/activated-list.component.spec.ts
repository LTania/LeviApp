import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedListComponent } from './activated-list.component';

describe('ActivatedListComponent', () => {
  let component: ActivatedListComponent;
  let fixture: ComponentFixture<ActivatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivatedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
