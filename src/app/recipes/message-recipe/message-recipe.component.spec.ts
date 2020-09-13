import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRecipeComponent } from './message-recipe.component';

describe('MessageRecipeComponent', () => {
  let component: MessageRecipeComponent;
  let fixture: ComponentFixture<MessageRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
