export class CreateInstituteDto {
  name: string;
  location_url: string;
  location_address: string[];
  images: string[];
  normalization_factor: number;
  partner_insti_ids?: string[];
}
