import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfJoinerComponent } from './pdf-joiner.component';

describe('PdfJoinerComponent', () => {
  let component: PdfJoinerComponent;
  let fixture: ComponentFixture<PdfJoinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfJoinerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfJoinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
