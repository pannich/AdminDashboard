/**
 * Uploader.ts
 *
 * Component : encapsulate excel interaction.
 *
 * Let user drag-and-drop an excel file.
 *
 */
import { read, utils } from "xlsx";
import type { FailedResident, Resident } from "../utils/types";
import { residentService } from "./ceResidentService";

class ResidentUploader {

  changeToLowercase(object: any): any {
    const lowered: { [key: string]: any } = {};
    Object.keys(object).forEach(key => {
      lowered[key.toLowerCase().trim()] = object[key];
    })

    return lowered;
  }

  createResident(dict: any): Resident {
    return {
      first_name: dict['first name']?.trim() || '',
      last_name: dict['last name']?.trim() || '',
      email: dict['email']?.trim() || '',
      cohort_id: Number.parseInt(dict['cohort id']) || 0,
      id: undefined,
    } as Resident;
  }

  async get_residents_from_excel(excel_file: File): Promise<Resident[]> {
    try {
      const arrayBuffer = await excel_file.arrayBuffer();
      const workbook = read(arrayBuffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data: any[] = utils.sheet_to_json(worksheet);
      return data
        .map(dict => this.changeToLowercase(dict))
        .map((dict) => this.createResident(dict));
    } catch (error) {
      console.error('Error parsing Excel file:', error);
      throw new Error('Failed to parse Excel file');
    }
  }

  async insertResident(resident: Resident): Promise<{ success: boolean; resident: Resident | FailedResident }> {
    return residentService
      .insert(resident)
      .then(inserted => {
        return { success: true, resident: inserted };
      })
      .catch((err) => {
        console.error(`Resident ${resident.first_name} ${resident.last_name} could not be inserted`);
        return { success: false, resident: { ...resident, failedError: err.message } };
      });
  }

  async insert_from_excel(excel_file: File): Promise<{ successCount: number; failedResidents: FailedResident[] }> {
    try {
      return this.get_residents_from_excel(excel_file)
        .then(async residents => {
          return Promise
            .all(residents.map(resident => this.insertResident(resident)))
            .then((resps) => {
              const successful = resps.filter(resp => resp.success);
              const failed = resps.filter(resp => !resp.success);
              return {
                successCount: successful.length,
                failedResidents: failed.map(resp => resp.resident as FailedResident)
              }
            })
        })
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error processing Excel file:', error.message);
      } else {
        console.error('Error processing Excel file:', error);
      }
      throw new Error('Failed to insert residents from Excel file');
    }
  }

}

const residentUploader = new ResidentUploader();
export { residentUploader };
