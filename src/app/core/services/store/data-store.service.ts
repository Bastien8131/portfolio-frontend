import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { ApiService } from '../strapi/api.strapi.service';
import { Profile } from '../../models/strapi/singleType/profile.model';
import { StrapiFile } from '../../models/strapi/file.model';
import { Projet } from '../../models/strapi/collectionType/projet.model';
import { Article } from '../../models/strapi/collectionType/article.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ErrorService } from '../error.service';
import {Liens} from '../../models/strapi/collectionType/lien.model';

interface AppState {
  profile: Profile | null;
  files: StrapiFile[];
  projets: Projet[];
  articles: Article[];
  liens: Liens[];
  loading: {
    profile: boolean;
    files: boolean;
    projets: boolean;
    articles: boolean;
    liens: boolean;
  };
  errors: {
    profile: any;
    files: any;
    projets: any;
    articles: any;
    liens: any;
  };
}

const initialState: AppState = {
  profile: null,
  files: [],
  projets: [],
  articles: [],
  liens: [],
  loading: {
    profile: false,
    files: false,
    projets: false,
    articles: false,
    liens: false
  },
  errors: {
    profile: null,
    files: null,
    projets: null,
    articles: null,
    liens: null,
  }
};

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private apiUrl = environment.strapiUrl + '/api';
  private apiToken = environment.strapiApiToken;

  // State management
  private stateSubject = new BehaviorSubject<AppState>(initialState);
  private state$ = this.stateSubject.asObservable();

  // Selectors
  profile$ = this.state$.pipe(map(state => state.profile));
  files$ = this.state$.pipe(map(state => state.files));
  projets$ = this.state$.pipe(map(state => state.projets));
  articles$ = this.state$.pipe(map(state => state.articles));
  liens$ = this.state$.pipe(map(state => state.liens));

  // Loading state selectors
  profileLoading$ = this.state$.pipe(map(state => state.loading.profile));
  filesLoading$ = this.state$.pipe(map(state => state.loading.files));
  projetsLoading$ = this.state$.pipe(map(state => state.loading.projets));
  articlesLoading$ = this.state$.pipe(map(state => state.loading.articles));
  liensLoading$ = this.state$.pipe(map(state => state.loading.liens));

  // Any loading selector
  isLoading$ = this.state$.pipe(
    map(state =>
      state.loading.profile ||
      state.loading.files ||
      state.loading.projets ||
      state.loading.articles ||
      state.loading.liens
    )
  );

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  // Helper to update state
  private updateState(newState: Partial<AppState>) {
    this.stateSubject.next({
      ...this.stateSubject.getValue(),
      ...newState
    });
  }

  // Initialize all data
  loadAllData() {
    this.loadProfile();
    this.loadFiles();
    this.loadProjets();
    this.loadArticles();
    this.loadLiens();
  }

  // Load profile data
  loadProfile() {
    const currentState = this.stateSubject.getValue();

    // Skip if already loaded or loading
    if (currentState.profile || currentState.loading.profile) {
      return;
    }

    // Update loading state
    this.updateState({
      loading: {
        ...currentState.loading,
        profile: true
      }
    });

    this.apiService.getSingleType<Profile>('profile', { populate: '*' })
      .pipe(
        tap(profile => {
          this.updateState({ profile });
        }),
        catchError(error => {
          this.updateState({
            errors: {
              ...currentState.errors,
              profile: error
            }
          });
          this.errorService.addError('Profile', 'Erreur lors du chargement du profil', error);
          return of(null);
        }),
        finalize(() => {
          this.updateState({
            loading: {
              ...this.stateSubject.getValue().loading,
              profile: false
            }
          });
        })
      )
      .subscribe();
  }

  // Load files
  loadFiles() {
    const currentState = this.stateSubject.getValue();

    // Skip if already loaded or loading
    if (currentState.files.length > 0 || currentState.loading.files) {
      return;
    }

    // Update loading state
    this.updateState({
      loading: {
        ...currentState.loading,
        files: true
      }
    });

    this.http.get<StrapiFile[]>(`${this.apiUrl}/upload/files`, {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`
      }
    })
      .pipe(
        tap(files => {
          this.updateState({ files });
        }),
        catchError(error => {
          this.updateState({
            errors: {
              ...currentState.errors,
              files: error
            }
          });
          this.errorService.addError('Files', 'Erreur lors du chargement des fichiers', error);
          return of([]);
        }),
        finalize(() => {
          this.updateState({
            loading: {
              ...this.stateSubject.getValue().loading,
              files: false
            }
          });
        })
      )
      .subscribe();
  }

  // Load projets
  loadProjets() {
    const currentState = this.stateSubject.getValue();

    // Skip if already loaded or loading
    if ((Array.isArray(currentState.projets) && currentState.projets.length > 0) || currentState.loading.projets) {
      return;
    }

    // Update loading state
    this.updateState({
      loading: {
        ...currentState.loading,
        projets: true
      }
    });

    this.apiService.getCollection<Projet>('projets', { populate: '*' })
      .pipe(
        tap(projets => {
          this.updateState({ projets });
        }),
        catchError(error => {
          this.updateState({
            errors: {
              ...currentState.errors,
              projets: error
            }
          });
          this.errorService.addError('Projets', 'Erreur lors du chargement des projets', error);
          return of([]);
        }),
        finalize(() => {
          this.updateState({
            loading: {
              ...this.stateSubject.getValue().loading,
              projets: false
            }
          });
        })
      )
      .subscribe();
  }

  // Load articles
  loadArticles() {
    const currentState = this.stateSubject.getValue();

    // Skip if already loaded or loading
    if ((Array.isArray(currentState.articles) && currentState.articles.length > 0) || currentState.loading.articles) {
      return;
    }

    // Update loading state
    this.updateState({
      loading: {
        ...currentState.loading,
        articles: true
      }
    });

    this.apiService.getCollection<Article>('articles', { populate: '*' })
      .pipe(
        tap(articles => {
          this.updateState({ articles });
        }),
        catchError(error => {
          this.updateState({
            errors: {
              ...currentState.errors,
              articles: error
            }
          });
          this.errorService.addError('Articles', 'Erreur lors du chargement des articles', error);
          return of([]);
        }),
        finalize(() => {
          this.updateState({
            loading: {
              ...this.stateSubject.getValue().loading,
              articles: false
            }
          });
        })
      )
      .subscribe();
  }

  // Load lien
  loadLiens(){
    const currentState = this.stateSubject.getValue();

    // Skip if already loaded or loading
    if ((Array.isArray(currentState.liens) && currentState.liens.length > 0) || currentState.loading.liens) {
      return;
    }

    // Update loading state
    this.updateState({
      loading: {
        ...currentState.loading,
        liens: true
      }
    });

    this.apiService.getCollection<Liens>('liens', { populate: '*' })
      .pipe(
        tap(liens => {
          this.updateState({ liens });
        }),
        catchError(error => {
          this.updateState({
            errors: {
              ...currentState.errors,
              liens: error
            }
          });
          this.errorService.addError('Liens', 'Erreur lors du chargement des liens', error);
          return of([]);
        }),
        finalize(() => {
          this.updateState({
            loading: {
              ...this.stateSubject.getValue().loading,
              liens: false
            }
          });
        })
      )
      .subscribe();

  }

  // Get file by name (helper method)
  getFileByName(filename: string): string | null {
    const files = this.stateSubject.getValue().files;

    const file = files.find(f => f.name === filename);
    if (!file) return null;

    if (file.ext === '.svg') return environment.strapiUrl + file.url;

    return environment.strapiUrl + (file.formats.thumbnail.url || file.url);
  }

  // Get current state snapshot
  getState(): AppState {
    return this.stateSubject.getValue();
  }
}
