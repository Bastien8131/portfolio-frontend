export interface ApiResponse<T> {
  data: T;
  status: number;
  success: boolean;
  message?: string;
}

export interface ApiErrorResponse {
  status: number;
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  };
  status: number;
  success: boolean;
}

export interface ApiLoadingState {
  loading: boolean;
  loaded: boolean;
  error: any;
}

export type ApiState<T> = {
  data: T | null;
} & ApiLoadingState;

export type ApiListState<T> = {
  data: T[];
} & ApiLoadingState;
