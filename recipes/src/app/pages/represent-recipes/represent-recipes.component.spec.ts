import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentRecipesComponent } from './represent-recipes.component';

describe('RepresentRecipesComponent', () => {
  let component: RepresentRecipesComponent;
  let fixture: ComponentFixture<RepresentRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresentRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepresentRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
