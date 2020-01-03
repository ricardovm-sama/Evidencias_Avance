import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearMePage } from './crear-me.page';

describe('CrearMePage', () => {
  let component: CrearMePage;
  let fixture: ComponentFixture<CrearMePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearMePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearMePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
