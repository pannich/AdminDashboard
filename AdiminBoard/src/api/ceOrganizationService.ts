import { EntityService } from "../api/EntityService"; // adjust path as needed
import type { Organization } from "../utils/types";
import { v4 as uuid } from 'uuid';

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

  async insert( organizationData : { name: string }): Promise<Organization> {
    if (!organizationData.name || organizationData.name.trim() === '') {
      throw new Error('Organization name cannot be empty');
    }
    const id = uuid();
    const org : Organization = { id, ...organizationData };
    const updatedOrg = await super.insert(org);
    console.log('Inserted organization:', updatedOrg);

    return updatedOrg as Organization;
  }
}

const organizationService = new OrganizationService();
export { organizationService };
