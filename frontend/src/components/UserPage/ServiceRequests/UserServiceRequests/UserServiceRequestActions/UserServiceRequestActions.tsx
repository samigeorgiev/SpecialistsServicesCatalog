import React, { FunctionComponent } from 'react';
import {ServiceRequestDto} from "../../../../../dtos/ServiceRequestDto";

export interface Props {
    serviceRequest: ServiceRequestDto;
}

export const UserServiceRequestActions: FunctionComponent<Props> = () => {
    return <h1>UserServiceRequestActions</h1>;
};
