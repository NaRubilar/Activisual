import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaleriafotosPage } from './galeriafotos.page';

describe('GaleriafotosPage', () => {
  let component: GaleriafotosPage;
  let fixture: ComponentFixture<GaleriafotosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GaleriafotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
