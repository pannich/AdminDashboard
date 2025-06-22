import { describe, it, expect, vi } from 'vitest';
import type { Resident, QueryModel } from '../utils/types';

// Mock the Supabase client first
vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: vi.fn(() => ({
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          range: vi.fn(() => ({
            order: vi.fn().mockResolvedValue({
              data: [
                {
                  id: '1',
                  first_name: 'John',
                  last_name: 'Doe',
                  email: 'john@example.com',
                  cohort_id: 1
                },
                {
                  id: '2',
                  first_name: 'Jane',
                  last_name: 'Smith',
                  email: 'jane@example.com',
                  cohort_id: 1
                }
              ],
              count: 2,
              error: null
            })
          }))
        }))
      }))
    }))
  };
});

import { EntityService } from '../api/EntityService';

// Create test class
class TestResidentService extends EntityService<Resident> {
  constructor() {
    super('residents');
  }
}

// Test
describe('ResidentService', () => {
  it('should fetch residents with pagination and sorting', async () => {
    const service = new TestResidentService();
    const queryModel: QueryModel = {
      page: 0,
      pageSize: 10,
      sortField: 'id',
      sortDirection: 'asc'
    };

    const result = await service.find(queryModel);

    expect(result.rows.length).toBe(2);
    expect(result.totalRowCount).toBe(2);
    expect(result.rows[0].first_name).toBe('John');
    expect(result.rows[1].first_name).toBe('Jane');
  });
});
