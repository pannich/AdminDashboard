/**
 * entityService.ts
 *
 */

import type { Entity, Identifier, PageInfo, QueryModel } from "../utils/types";
import { createClient } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
export const supabaseClient = createClient(supabaseUrl, supabaseKey);

abstract class EntityService<T extends Entity> {
  tableName = '';

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  supportedStringFilters(): string[] {
    return ['contains', 'startsWith', 'endsWith'];
  }

  supportedNumberFilters(): string[] {
    return ['=', '>', '<'];
  }

  // Paginated table views
  async find(queryModel: QueryModel, select?: string): Promise<PageInfo<T>> {
    try {
      const fModel = queryModel as any;
      let query: any = supabaseClient
        .from(this.tableName)
        .select(select ?? '*', { count: 'exact' })
        .range(
          queryModel.page * queryModel.pageSize,
          (queryModel.page + 1) * queryModel.pageSize - 1
        )
        .order(queryModel.sortField, { ascending: queryModel.sortDirection === 'asc' });

      if (fModel.filterField && fModel.filterOperator && fModel.filterValue) {
        switch (fModel.filterOperator) {
          case '=':
            query = query.eq(fModel.filterField, fModel.filterValue);
            break;
          case '>':
            query = query.gt(fModel.filterField, fModel.filterValue);
            break;
          case '<':
            query = query.lt(fModel.filterField, fModel.filterValue);
            break;
          case 'contains':
            query = query.ilike(fModel.filterField, `%${fModel.filterValue}%`);
            break;
          case 'startsWith':
            query = query.ilike(fModel.filterField, `${fModel.filterValue}%`);
            break;
          case 'endsWith':
            query = query.ilike(fModel.filterField, `%${fModel.filterValue}`);
            break;
        }
      }

      const { data, count, error } = await query;
      if (error) throw error;

      return {
        rows: (data ?? []) as T[],
        totalRowCount: count ?? 0,
      };
    } catch (err) {
      console.error('Unexpected error:', err);
      throw err;
    }
  }

  // Fetching all records without paging
  async getAll(select?: string): Promise<T[]> {
    const { data, error } = await supabaseClient.from(this.tableName).select(select ?? '*');
    if (error) {
      console.error('Error fetching all entities:', error);
      return [];
    }
    return data as unknown as T[];
  }

  // Fetching a single record by ID
  async getById(entityId: Identifier, select?: string): Promise<T | null> {
    const { data, error } = await supabaseClient
      .from(this.tableName)
      .select(select ?? '*')
      .eq('id', entityId)
      .single();

    if (error) {
      console.error('Error fetching entity by ID:', error);
      return null;
    }
    return data as unknown as T;
  }

  // Creating, updating, and deleting records
  async insert(entity: T, select?: string): Promise<T> {
    // Auto-generate UUID if id is not specified
    if (!entity.id) {
      entity.id = uuid();
    }
    const { data, error } = await supabaseClient
      .from(this.tableName)
      .insert([entity])
      .select(select ?? '*')
      .single();

    if (error) {
      console.error('Error inserting entity:', error);
      throw new Error(error.message);
    }
    return data as unknown as T;
  }

  async batchInsert(entities: T[], select?: string): Promise<T[]> {
    const { data, error } = await supabaseClient
      .from(this.tableName)
      .insert(entities)
      .select(select ?? '*');

    if (error) {
      console.error('Error in batch insert:', error);
      return [];
    }
    return data as unknown as T[];
  }

  async update(entityId: Identifier, updatedFields: Partial<T>, select?: string): Promise<T> {
    const { data, error } = await supabaseClient
      .from(this.tableName)
      .update(updatedFields)
      .eq('id', entityId)
      .select(select ?? '*')
      .single();

    if (error) {
      console.error('Error updating entity:', error);
      throw new Error(error.message);
    }
    return data as unknown as T;
  }

  async delete(entityId: Identifier): Promise<void> {
    const { error } = await supabaseClient
      .from(this.tableName)
      .delete()
      .eq('id', entityId);

    if (error) {
      console.error('Error deleting entity:', error);
      throw new Error(error.message);
    }
  }
}

export { EntityService };
