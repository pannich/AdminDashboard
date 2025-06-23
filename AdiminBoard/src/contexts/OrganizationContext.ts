import { createContext } from 'react';
import type { Resident } from '../utils/types';

interface OrganizationContextType {
  residents: Resident[];
  setResidents: React.Dispatch<React.SetStateAction<Resident[]>>;
  orgName: string;
  setOrgName: React.Dispatch<React.SetStateAction<string>>;
}

export const OrganizationContext = createContext<OrganizationContextType>({
  residents: [],
  setResidents: () => {},
  orgName: '',
  setOrgName: () => {},
});
