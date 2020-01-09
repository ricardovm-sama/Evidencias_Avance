import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModRctPage } from './mod-rct.page';

describe('ModRctPage', () => {
  let component: ModRctPage;
  let fixture: ComponentFixture<ModRctPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModRctPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModRctPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
