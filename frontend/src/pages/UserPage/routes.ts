import { ComponentType } from 'react';
import { BecomeSpecialist } from '../../components/UserPage/BecomeSpecialist';
import { OfferedServices } from '../../components/UserPage/OfferedServices';
import { PendingServiceRequests } from '../../components/UserPage/ServiceRequests/PendingServiceRequests';
import { ServiceRequestsInProgress } from "../../components/UserPage/ServiceRequests/ServiceRequestsInProgress";
import { PendingPaymentServiceRequests } from "../../components/UserPage/ServiceRequests/PendingPaymentServiceRequests";
import { FinishedServiceRequests } from "../../components/UserPage/ServiceRequests/FinishedServiceRequests";
import { UserServiceRequests } from '../../components/UserPage/ServiceRequests/UserServiceRequests';

export enum RoutesGroupType {
    USER,
    SPECIALIST,
    NON_SPECIALIST
}

export interface RoutesGroup {
    type: RoutesGroupType;
    name: string;
    routes: Route[];
}

export interface Route {
    name: string;
    path: string;
    component: ComponentType;
}

export const routes: RoutesGroup[] = [
    {
        name: 'User',
        type: RoutesGroupType.USER,
        routes: [
            {
                name: 'Pending payment',
                path: 'service-requests/pending-payment',
                component: PendingPaymentServiceRequests
            },
            {
                name: 'Finished service requests',
                path: 'service-requests/finished',
                component: FinishedServiceRequests
            },
            {
                name: 'Service Requests',
                path: 'user-service-requests',
                component: UserServiceRequests
            }
        ]
    },
    {
        name: 'Specialist',
        type: RoutesGroupType.SPECIALIST,
        routes: [
            {
                name: 'Offered Services',
                path: 'offered-services',
                component: OfferedServices
            },
            {
                name: 'Pending service requests',
                path: 'service-requests/pending',
                component: PendingServiceRequests
            },
            {
                name: 'Service requests in progress',
                path: 'service-requests/in-progress',
                component: ServiceRequestsInProgress
            }
        ]
    },
    {
        name: 'Become Specialist',
        type: RoutesGroupType.NON_SPECIALIST,
        routes: [
            {
                name: 'Become Specialist',
                path: 'become-specialist',
                component: BecomeSpecialist
            }
        ]
    }
];
