export interface BecomeSpecialist {
    doBecomeSpecialist: (locationId: number) => void;
    error?: string;
    finished: boolean;
}
