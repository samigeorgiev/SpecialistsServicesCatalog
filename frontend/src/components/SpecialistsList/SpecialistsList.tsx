import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, List } from 'semantic-ui-react';
import { UserContext } from '../../contexts/User/UserContext';
import { makeServiceRequest } from '../../services/serviceRequestsService';
import { toast } from 'react-toastify';

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

    const requestServiceHandler = (requestedServiceId: number) => {
        if (user === null) {
            throw new Error('User is null');
        }

        makeServiceRequest(user, { requestedServiceId })
            .then(() => {
                toast.success('Service request made successfully');
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            });
    };

    return (
        <List divided relaxed>
            {offeredServices.map(offeredService => (
                <List.Item key={offeredService.specialist.id}>
                    <List.Header>{offeredService.specialist.name}</List.Header>
                    <List.Content>
                        <p>Price: {offeredService.price}</p>
                        <p>Is prepaid: {offeredService.prepaid ? 'yes' : 'no'}</p>
                        {user !== null ? (
                            <Button color="green" onClick={() => requestServiceHandler(offeredService.id)}>
                                Request
                            </Button>
                        ) : null}
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
    id: number;
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
