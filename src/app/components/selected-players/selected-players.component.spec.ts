import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPlayersComponent } from './selected-players.component';

describe('SelectedPlayersComponent', () => {
  let component: SelectedPlayersComponent;
  let fixture: ComponentFixture<SelectedPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedPlayersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
