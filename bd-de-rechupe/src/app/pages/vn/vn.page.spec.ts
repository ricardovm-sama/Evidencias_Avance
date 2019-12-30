import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VnPage } from './vn.page';

describe('VnPage', () => {
  let component: VnPage;
  let fixture: ComponentFixture<VnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
