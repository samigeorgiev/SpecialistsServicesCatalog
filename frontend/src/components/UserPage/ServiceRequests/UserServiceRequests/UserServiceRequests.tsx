import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../contexts/User/UserContext';
import { ServiceRequestDto } from '../../../../dtos/ServiceRequestDto';
import { usersService } from '../../../../services/usersService';
import { toast } from 'react-toastify';
import { DropdownItemProps, DropdownProps, Header, Item, Segment, Select } from 'semantic-ui-react';
import { UserServiceRequestActions } from './UserServiceRequestActions';
import { ServiceRequestStatus } from '../../../../dtos/ServiceRequestStatus';

export const UserServiceRequests: FunctionComponent = () => {
    const { user } = useContext(UserContext);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequestDto[]>([]);
    const [status, setStatus] = useState<ServiceRequestStatus>();
    const [paid, setPaid] = useState<boolean>();

    const statusOptions: DropdownItemProps[] = Object.keys(ServiceRequestStatus).map(status => ({
        key: status,
        value: status,
        text: status.toLowerCase()
    }));
    statusOptions.push({
        key: 'any',
        value: undefined,
        text: 'any'
    });
    const paidOptions: DropdownItemProps[] = [
        {
            key: true,
            value: true,
            text: 'yes'
        },
        {
            key: false,
            value: false,
            text: 'no'
        },
        {
            key: 'any',
            value: undefined,
            text: 'any'
        }
    ];

    const getServiceRequests = useCallback(() => {
        if (user === null) {
            throw new Error('User is null');
        }
        usersService
            .getServiceRequests(user, status, paid)
            .then(response => {
                setServiceRequests(response.data.serviceRequests);
            })
            .catch(error => {
                toast.error(error.message);
            });
    }, [paid, status, user]);

    useEffect(() => {
        getServiceRequests();
    }, [getServiceRequests]);

    const statusChangeHandler = (data: DropdownProps) => {
        // @ts-ignore
        setStatus(ServiceRequestStatus[data.value]);
    };

    const paidChangeHandler = (data: DropdownProps) => {
        const value = data.value as boolean | undefined;
        setPaid(value);
    };

    const content = (
        <Item.Group divided as="ul">
            {serviceRequests.map(serviceRequest => (
                <Item key={serviceRequest.id} as="li">
                    <Item.Content>
                        <Item.Header content={serviceRequest.requestedService.specialist.name} />
                        <Item.Description>Service: {serviceRequest.requestedService.service.name}</Item.Description>
                        <Item.Extra>
                            <UserServiceRequestActions serviceRequest={serviceRequest} />
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    );

    return (
        <>
            <Select
                options={statusOptions}
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => statusChangeHandler(data)}
                placeholder="Status"
            />
            <Select
                options={paidOptions}
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => paidChangeHandler(data)}
                placeholder="Paid"
            />
            <Header content="User service requests" textAlign="center" size="huge" style={{ marginTop: '2rem' }} />
            <Segment content={content} />
        </>
    );
};
