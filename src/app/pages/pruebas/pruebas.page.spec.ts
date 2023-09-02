import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PruebasPage } from './pruebas.page';

describe('PruebasPage', () => {
  let component: PruebasPage;
  let fixture: ComponentFixture<PruebasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PruebasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
