import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Button, DropdownItemProps, DropdownProps, List, Select } from 'semantic-ui-react';
import { UserContext } from '../../contexts/User/UserContext';
import { serviceRequestsService } from '../../services/serviceRequestsService';
import { toast } from 'react-toastify';
import { servicesService } from '../../services/servicesService';
import { OfferedServiceDto } from '../../dtos/OfferedServiceDto';
import { LocationDto } from '../../dtos/LocationDto';
import { locationsService } from '../../services/locationsService';

export interface Props {
    serviceId?: number;
}

export const SpecialistsList: FunctionComponent<Props> = props => {
    const { user } = useContext(UserContext);
    const [offeredServices, setOfferedServices] = useState<OfferedServiceDto[]>([]);
    const [locations, setLocations] = useState<LocationDto[]>([]);
    const [locationId, setLocationId] = useState<number>();
    const [minimumRating, setMinimumRating] = useState<number>();

    useEffect(() => {
        locationsService
            .getLocations()
            .then(response => {
                setLocations(response.data.locations);
            })
            .catch(error => {
                toast.error(error.message);
            });
    }, []);

    useEffect(() => {
        if (props.serviceId === undefined) return;
        servicesService.getOfferedServices(props.serviceId, locationId, minimumRating).then(response => {
            setOfferedServices(response.data.offeredServices);
        });
    }, [locationId, minimumRating, props.serviceId]);

    const locationChangeHandler = (data: DropdownProps) => {
        const value = data.value as number;
        setLocationId(value);
    };

    const requestServiceHandler = (requestedServiceId: number) => {
        if (user === null) {
            throw new Error('User is null');
        }

        serviceRequestsService
            .makeServiceRequest(user, { requestedServiceId })
            .then(() => {
                toast.success('Service request made successfully');
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    const locationsOptions: DropdownItemProps[] = locations.map(location => ({
        key: location.id,
        value: location.id,
        text: location.name
    }));
    locationsOptions.push({
        key: 'any',
        value: undefined,
        text: 'any'
    });

    return (
        <>
            <Select
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
                    locationChangeHandler(data)
                }
                options={locationsOptions}
                placeholder="Select location"
            />
            {/*<Select*/}
            {/*        options={paidOptions}*/}
            {/*        onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => paidChangeHandler(data)}*/}
            {/*        placeholder="Paid"*/}
            {/*/>*/}
            <List divided relaxed>
                {offeredServices.map(offeredService => (
                    <List.Item key={offeredService.specialist.id}>
                        <List.Header>{offeredService.specialist.name}</List.Header>
                        <List.Content>
                            <p>Price: {offeredService.price}</p>
                            <p>Is prepaid: {offeredService.isPrepaid ? 'yes' : 'no'}</p>
                            {user !== null ? (
                                <Button color="green" onClick={() => requestServiceHandler(offeredService.id)}>
                                    Request
                                </Button>
                            ) : null}
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </>
    );
};
