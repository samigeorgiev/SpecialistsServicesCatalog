import { SpecialistDto } from './SpecialistDto';
import { ServiceDto } from './ServiceDto';

export interface OfferedServiceDto {
    id: number;
    specialist: SpecialistDto;
    service: ServiceDto;
    price: number;
    isPrepaid: boolean;
    //
    prepaid: boolean;
}
