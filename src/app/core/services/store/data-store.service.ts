import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { ApiService } from '../strapi/api.strapi.service';
import { Profile } from '../../models/strapi/singleType/profile.model';
import { StrapiFile } from '../../models/strapi/file.model';
import { Projet } from '../../models/strapi/collectionType/projet.model';
import { Article } from '../../models/strapi/collectionType/article.model';
import { environment } from '../../../../environments/environment';
import { ErrorService } from '../error.service';
import { Liens } from '../../models/strapi/collectionType/lien.model';

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
    liens: null
  }
};

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private stateSubject = new BehaviorSubject<AppState>(initialState);
  private state$ = this.stateSubject.asObservable();

  // Sélecteurs données
  profile$ = this.state$.pipe(map(state => state.profile));
  files$ = this.state$.pipe(map(state => state.files));
  projets$ = this.state$.pipe(map(state => state.projets));
  articles$ = this.state$.pipe(map(state => state.articles));
  liens$ = this.state$.pipe(map(state => state.liens));

  // Sélecteurs loading
  profileLoading$ = this.state$.pipe(map(state => state.loading.profile));
  filesLoading$ = this.state$.pipe(map(state => state.loading.files));
  projetsLoading$ = this.state$.pipe(map(state => state.loading.projets));
  articlesLoading$ = this.state$.pipe(map(state => state.loading.articles));
  liensLoading$ = this.state$.pipe(map(state => state.loading.liens));

  isLoading$ = this.state$.pipe(
    map(state =>
      state.loading.profile ||
      state.loading.files ||
      state.loading.projets ||
      state.loading.articles ||
      state.loading.liens
    )
  );

  // Sélecteur dérivé : URL du CV
  cvUrl$ = this.profile$.pipe(
    map(profile => {
      if (!profile?.cv?.data?.attributes?.url) return null;
      return `${environment.strapiUrl}${profile.cv.data.attributes.url}`;
    })
  );

  constructor(
    private apiService: ApiService,
    private errorService: ErrorService
  ) {}

  private updateState(newState: Partial<AppState>) {
    this.stateSubject.next({
      ...this.stateSubject.getValue(),
      ...newState
    });
  }

  loadAllData() {
    this.loadProfile();
    this.loadFiles();
    this.loadProjets();
    this.loadArticles();
    this.loadLiens();
  }

  loadProfile() {
    const currentState = this.stateSubject.getValue();
    if (currentState.profile || currentState.loading.profile) return;

    this.updateState({ loading: { ...currentState.loading, profile: true } });

    this.apiService.getSingleType<Profile>('profile', { populate: '*' })
      .pipe(
        tap(profile => this.updateState({ profile })),
        catchError(error => {
          this.updateState({ errors: { ...this.stateSubject.getValue().errors, profile: error } });
          this.errorService.addError('DataStore', 'Erreur lors du chargement du profil');
          return of(null);
        }),
        finalize(() => {
          const s = this.stateSubject.getValue();
          this.updateState({ loading: { ...s.loading, profile: false } });
        })
      )
      .subscribe();
  }

  loadFiles() {
    const currentState = this.stateSubject.getValue();
    if (currentState.files.length || currentState.loading.files) return;

    this.updateState({ loading: { ...currentState.loading, files: true } });

    this.apiService.getUploadFiles()
      .pipe(
        tap(files => this.updateState({ files })),
        catchError(error => {
          this.updateState({ errors: { ...this.stateSubject.getValue().errors, files: error } });
          this.errorService.addError('DataStore', 'Erreur lors du chargement des fichiers');
          return of([]);
        }),
        finalize(() => {
          const s = this.stateSubject.getValue();
          this.updateState({ loading: { ...s.loading, files: false } });
        })
      )
      .subscribe();
  }

  loadProjets() {
    const currentState = this.stateSubject.getValue();
    if (currentState.projets.length || currentState.loading.projets) return;

    this.updateState({ loading: { ...currentState.loading, projets: true } });

    this.apiService.getCollection<Projet>('projets', { populate: '*' })
      .pipe(
        tap(projets => this.updateState({ projets })),
        catchError(error => {
          this.updateState({ errors: { ...this.stateSubject.getValue().errors, projets: error } });
          this.errorService.addError('DataStore', 'Erreur lors du chargement des projets');
          return of([]);
        }),
        finalize(() => {
          const s = this.stateSubject.getValue();
          this.updateState({ loading: { ...s.loading, projets: false } });
        })
      )
      .subscribe();
  }

  loadArticles() {
    const currentState = this.stateSubject.getValue();
    if (currentState.articles.length || currentState.loading.articles) return;

    this.updateState({ loading: { ...currentState.loading, articles: true } });

    this.apiService.getCollection<Article>('articles', { populate: '*' })
      .pipe(
        tap(articles => this.updateState({ articles })),
        catchError(error => {
          this.updateState({ errors: { ...this.stateSubject.getValue().errors, articles: error } });
          this.errorService.addError('DataStore', 'Erreur lors du chargement des articles');
          return of([]);
        }),
        finalize(() => {
          const s = this.stateSubject.getValue();
          this.updateState({ loading: { ...s.loading, articles: false } });
        })
      )
      .subscribe();
  }

  loadLiens() {
    const currentState = this.stateSubject.getValue();
    if (currentState.liens.length || currentState.loading.liens) return;

    this.updateState({ loading: { ...currentState.loading, liens: true } });

    this.apiService.getCollection<Liens>('liens', { populate: '*' })
      .pipe(
        tap(liens => this.updateState({ liens })),
        catchError(error => {
          this.updateState({ errors: { ...this.stateSubject.getValue().errors, liens: error } });
          this.errorService.addError('DataStore', 'Erreur lors du chargement des liens');
          return of([]);
        }),
        finalize(() => {
          const s = this.stateSubject.getValue();
          this.updateState({ loading: { ...s.loading, liens: false } });
        })
      )
      .subscribe();
  }

  getFileByName(filename: string): string | null {
    const files = this.stateSubject.getValue().files;
    const file = files.find(f => f.name === filename);
    if (!file) return null;

    if (file.ext === '.svg') return environment.strapiUrl + file.url;
    return environment.strapiUrl + file.formats.thumbnail.url;
  }
}
