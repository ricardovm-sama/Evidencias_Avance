import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElimIngPage } from './elim-ing.page';

describe('ElimIngPage', () => {
  let component: ElimIngPage;
  let fixture: ComponentFixture<ElimIngPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElimIngPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElimIngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
