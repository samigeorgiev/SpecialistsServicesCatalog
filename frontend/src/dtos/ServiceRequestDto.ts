import { ServiceRequestStatus } from './ServiceRequestStatus';
import { OfferedServiceDto } from './OfferedServiceDto';

export interface ServiceRequestDto {
    id: number;
    status: ServiceRequestStatus;
    paid: boolean;
    rating: number;
    comment: string;
    requestorName: string;
    requestorEmail: string;
    requestedService: OfferedServiceDto;
}
