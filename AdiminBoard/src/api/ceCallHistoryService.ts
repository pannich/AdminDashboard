import { EntityService } from '../api/EntityService'; // adjust path as needed
import type { CallHistory } from '../utils/types';

class CallHistoryService extends EntityService<CallHistory> {
  constructor() {
    super('call_history'); // supabase table name
  }

  async findWithResident(): Promise<{ rows: CallHistory[]; totalRowCount: number }> {
    const { rows, totalRowCount } = await this.find({
      page: 0,
      pageSize: 50,
      sortField: 'created_at',
      sortDirection: 'desc',
    }, '*, residents(*)'); // a foreign key relation exists
    return { rows, totalRowCount };
  }
}

const callhistoryService = new CallHistoryService();
export { callhistoryService };
