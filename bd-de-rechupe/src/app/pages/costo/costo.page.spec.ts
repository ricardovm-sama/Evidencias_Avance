import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CostoPage } from './costo.page';

describe('CostoPage', () => {
  let component: CostoPage;
  let fixture: ComponentFixture<CostoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CostoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
