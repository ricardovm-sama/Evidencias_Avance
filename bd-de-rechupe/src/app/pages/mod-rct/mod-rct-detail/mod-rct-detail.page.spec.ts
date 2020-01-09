import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModRctDetailPage } from './mod-rct-detail.page';

describe('ModRctDetailPage', () => {
  let component: ModRctDetailPage;
  let fixture: ComponentFixture<ModRctDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModRctDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModRctDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
