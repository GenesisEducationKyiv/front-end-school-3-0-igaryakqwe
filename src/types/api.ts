export interface APIResponse<T> {
  data: T;
  meta: APIMeta;
}

export interface APIMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface APIError {
  error: string;
}

export interface APIDeleteResponse {
  success: string[];
  failed: string[];
}
