import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, List } from 'semantic-ui-react';
import { UserContext } from '../../contexts/User/UserContext';

export interface Props {
    serviceId?: number;
}

export const SpecialistsList: FunctionComponent<Props> = props => {
    const { user } = useContext(UserContext);
    const [offeredServices, setOfferedServices] = useState<OfferedService[]>([]);

    useEffect(() => {
        if (props.serviceId === undefined) return;
        fetch(`${process.env.REACT_APP_GET_OFFERED_SERVICES_BY_SERVICE_URL}/${props.serviceId}/offered-services`)
            .then(res => res.json())
            .then((getOfferedServicesResponse: GetOfferedServicesResponse) => {
                setOfferedServices(getOfferedServicesResponse.offeredServices);
            });
    }, [props.serviceId]);

    return (
        <List divided relaxed>
            {offeredServices.map(offeredService => (
                <List.Item key={offeredService.specialist.id}>
                    <List.Header>{offeredService.specialist.name}</List.Header>
                    <List.Content>
                        <p>Price: {offeredService.price}</p>
                        <p>Is prepaid: {offeredService.prepaid ? 'yes' : 'no'}</p>
                        {user !== null ? <Button color="green">Request</Button> : null}
                    </List.Content>
                </List.Item>
            ))}
        </List>
    );
};

interface GetOfferedServicesResponse {
    offeredServices: OfferedService[];
}

interface OfferedService {
    specialist: Specialist;
    service: Service;
    price: number;
    prepaid: boolean;
}

interface Specialist {
    id: number;
    name: string;
}

interface Service {
    name: string;
}
