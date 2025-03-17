export interface StrapiRoot {
  data: StrapiData[] | StrapiData;
  meta: {
    pagination?: StrapiPagination;
  };
}

export interface StrapiData {
  id: number;
  attributes: StrapiAttributes;
}

export interface StrapiAttributes {
  titre: string
  corp: string
  type: string
  createdAt: string
  updatedAt: string
  publishedAt: any
  locale: string
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      name: string;
      url: string;
      formats: {
        thumbnail: { url: string };
        small: { url: string };
        medium: { url: string };
        large?: { url: string };
      };
    };
  };
}

export interface StrapiRelation {
  data: StrapiData[] | StrapiData | null;
}
