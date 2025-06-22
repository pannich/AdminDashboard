import { EntityService } from "../api/EntityService"; // adjust path as needed
import type { Organization } from "../utils/types";


class OrganizationService extends EntityService<Organization> {
  constructor() {
    super('organizations');
  }

  async findWithResidents(): Promise<{ rows: Organization[]; totalRowCount: number }> {
    const { rows, totalRowCount } = await this.find({
      page: 0,
      pageSize: 50,
      sortField: 'created_at',
      sortDirection: 'desc',
    }, '*, residents(*)'); // a foreign key relation exists
    return { rows, totalRowCount };
  }
}

const organizationService = new OrganizationService();
export { organizationService };
