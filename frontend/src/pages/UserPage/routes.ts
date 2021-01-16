import { ComponentType } from "react";
import { BecomeSpecialist } from "../../components/UserPage/BecomeSpecialist";
import { OfferedServices } from "../../components/UserPage/OfferedServices";

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
                name: 'Test',
                path: 'test',
                component: BecomeSpecialist
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
