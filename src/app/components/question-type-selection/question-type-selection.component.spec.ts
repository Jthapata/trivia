import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeSelectionComponent } from './question-type-selection.component';

describe('QuestionTypeSelectionComponent', () => {
  let component: QuestionTypeSelectionComponent;
  let fixture: ComponentFixture<QuestionTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionTypeSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
