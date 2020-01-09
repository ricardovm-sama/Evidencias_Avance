import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModIngPage } from './mod-ing.page';

describe('ModIngPage', () => {
  let component: ModIngPage;
  let fixture: ComponentFixture<ModIngPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModIngPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModIngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
