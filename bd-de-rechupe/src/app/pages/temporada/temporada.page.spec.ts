import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemporadaPage } from './temporada.page';

describe('TemporadaPage', () => {
  let component: TemporadaPage;
  let fixture: ComponentFixture<TemporadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemporadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
