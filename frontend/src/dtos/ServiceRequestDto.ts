import { OfferedService } from '../components/UserPage/OfferedServices/OfferedServices';

export interface ServiceRequestDto {
    id: number;
    status: string;
    paid: boolean;
    rating: number;
    comment: string;
    requestorName: string;
    requestedService: OfferedService;
}
