import { EntityService } from '../api/EntityService'; // adjust path as needed
import type { Resident } from '../utils/types';

class ResidentService extends EntityService<Resident> {
  constructor() {
    super('residents');
  }

  // Optional: you can still override or add custom methods here
}

const residentService = new ResidentService();

export { residentService };
