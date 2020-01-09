import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModIngDetailPage } from './mod-ing-detail.page';

describe('ModIngDetailPage', () => {
  let component: ModIngDetailPage;
  let fixture: ComponentFixture<ModIngDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModIngDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModIngDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
