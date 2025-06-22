/**
 * types.ts
 */

type Identifier = string | number | undefined | null;

type Entity = {
  id: Identifier;
}

type Resident = Entity & {
  first_name: string;
  last_name: string;
  email: string;
  cohort_id: number;
}

type Organization = Entity & {
  name: string;
  residents: Resident[];
}

type CallHistory = Entity & {
  start_at: string;
  end_at: string;
  resident_id: number;
  summary: string;
  recording_url: string;
  duration: number;
  language: string;
}

type PageInfo<T> = {
  rows: T[];
  totalRowCount: number;
};

type QueryModel = {
  page: number;
  pageSize: number;
  sortField: string;
  sortDirection: 'asc' | 'desc';
};

export type {
  Identifier,
  Entity,
  Resident,
  Organization,
  CallHistory,
  PageInfo,
  QueryModel,
}
