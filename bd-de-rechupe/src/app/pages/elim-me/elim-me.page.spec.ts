import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElimMePage } from './elim-me.page';

describe('ElimMePage', () => {
  let component: ElimMePage;
  let fixture: ComponentFixture<ElimMePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElimMePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElimMePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
