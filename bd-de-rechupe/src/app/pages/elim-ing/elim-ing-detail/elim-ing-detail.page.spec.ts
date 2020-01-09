import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElimIngDetailPage } from './elim-ing-detail.page';

describe('ElimIngDetailPage', () => {
  let component: ElimIngDetailPage;
  let fixture: ComponentFixture<ElimIngDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElimIngDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElimIngDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
