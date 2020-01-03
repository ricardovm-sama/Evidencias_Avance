import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaterialexternoPage } from './materialexterno.page';

describe('MaterialexternoPage', () => {
  let component: MaterialexternoPage;
  let fixture: ComponentFixture<MaterialexternoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialexternoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialexternoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
