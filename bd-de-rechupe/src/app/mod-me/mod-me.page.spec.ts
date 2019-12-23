import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModMePage } from './mod-me.page';

describe('ModMePage', () => {
  let component: ModMePage;
  let fixture: ComponentFixture<ModMePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModMePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModMePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
