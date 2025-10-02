import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    const favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'removeFavorite'
    ], {
      favorites$: of(['London', 'Paris'])
    });

    await TestBed.configureTestingModule({
      imports: [
        SearchComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatChipsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy }
      ]
    }).compileComponents();

    favoritesService = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search control', () => {
    expect(component.searchControl.value).toBe('');
  });

  it('should validate required field', () => {
    component.searchControl.setValue('');
    expect(component.searchControl.hasError('required')).toBe(true);
  });

  it('should validate minimum length', () => {
    component.searchControl.setValue('a');
    expect(component.searchControl.hasError('minlength')).toBe(true);

    component.searchControl.setValue('ab');
    expect(component.searchControl.hasError('minlength')).toBe(false);
  });

  it('should emit citySearch when valid search is performed', () => {
    spyOn(component.citySearch, 'emit');

    component.searchControl.setValue('London');
    component.onSearch();

    expect(component.citySearch.emit).toHaveBeenCalledWith('London');
  });

  it('should not emit citySearch when invalid search is performed', () => {
    spyOn(component.citySearch, 'emit');

    component.searchControl.setValue('');
    component.onSearch();

    expect(component.citySearch.emit).not.toHaveBeenCalled();
  });

  it('should load favorites from service', () => {
    expect(component.favorites()).toEqual(['London', 'Paris']);
  });

  it('should handle favorite selection', () => {
    spyOn(component.citySearch, 'emit');

    component.onFavoriteSelected('London');

    expect(component.searchControl.value).toBe('London');
    expect(component.citySearch.emit).toHaveBeenCalledWith('London');
  });

  it('should remove favorite', () => {
    const event = new Event('click');
    spyOn(event, 'stopPropagation');

    component.removeFavorite(event, 'London');

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(favoritesService.removeFavorite).toHaveBeenCalledWith('London');
  });
});
