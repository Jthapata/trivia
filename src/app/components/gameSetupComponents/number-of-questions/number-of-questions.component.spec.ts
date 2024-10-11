import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfQuestionsComponent } from './number-of-questions.component';

describe('NumberOfQuestionsComponent', () => {
  let component: NumberOfQuestionsComponent;
  let fixture: ComponentFixture<NumberOfQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberOfQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberOfQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
