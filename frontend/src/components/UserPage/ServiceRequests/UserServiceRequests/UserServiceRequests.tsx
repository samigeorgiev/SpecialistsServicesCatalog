import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, DropdownItemProps, DropdownProps, Form, Header, Icon, Segment } from 'semantic-ui-react';
import { AuthModalContext } from '../../../../contexts/AuthModal/AuthModalContext';
import { UserContext } from '../../../../contexts/User/UserContext';
import { ServiceRequestDto } from '../../../../dtos/ServiceRequestDto';
import { ServiceRequestStatus } from '../../../../dtos/ServiceRequestStatus';
import { usersService } from '../../../../services/usersService';
import { CardList } from '../../../Common/Card/CardList/CardList';
import { UserServiceRequestCard } from './UserServiceRequestCard';
import styles from './UserServiceRequests.module.scss';

export const UserServiceRequests: FunctionComponent = () => {
    const { user } = useContext(UserContext);
    const { openAuthenticationModalHandler } = useContext(AuthModalContext);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequestDto[]>([]);
    const [status, setStatus] = useState<ServiceRequestStatus | string>('');
    const [paid, setPaid] = useState<boolean | string>('');

    const statusOptions: DropdownItemProps[] = Object.keys(ServiceRequestStatus).map(status => ({
        key: status,
        value: status,
        text:
            status === ServiceRequestStatus.IN_PROGRESS
                ? 'In Progress'
                : status[0] + status.toLocaleLowerCase().slice(1)
    }));
    statusOptions.push({
        key: 'any',
        value: '',
        text: 'Any'
    });
    const paidOptions: DropdownItemProps[] = [
        {
            key: true,
            value: true,
            text: 'Yes'
        },
        {
            key: false,
            value: false,
            text: 'No'
        },
        {
            key: 'any',
            value: '',
            text: 'Any'
        }
    ];

    const getServiceRequests = useCallback(() => {
        if (user === null) {
            openAuthenticationModalHandler();
            return;
        }

        const isPaid = typeof paid === 'string' ? undefined : paid;
        const selectedStatus = status === '' ? undefined : (status as ServiceRequestStatus);

        usersService
            .getServiceRequests(user, selectedStatus, isPaid)
            .then(response => {
                setServiceRequests(response.data.serviceRequests);
            })
            .catch(error => {
                toast.error('Error: Could not get services');
            });
    }, [openAuthenticationModalHandler, paid, status, user]);

    useEffect(() => {
        getServiceRequests();
    }, [getServiceRequests]);

    const statusChangeHandler = (data: DropdownProps) => {
        setStatus(data.value as string);
    };

    const paidChangeHandler = (data: DropdownProps) => {
        const value = data.value as boolean | string;
        setPaid(value);
    };

    return (
        <>
            <Form className={styles.ServiceFilters} size="large">
                <Form.Select
                    options={statusOptions}
                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
                        statusChangeHandler(data)
                    }
                    value={status}
                    placeholder="Status"
                />
                <Form.Select
                    options={paidOptions}
                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
                        paidChangeHandler(data)
                    }
                    value={paid}
                    placeholder="Paid"
                />
            </Form>
            {serviceRequests.length !== 0 ? (
                <CardList>
                    {serviceRequests.map(serviceRequest => (
                        <UserServiceRequestCard
                            key={serviceRequest.id}
                            serviceRequest={serviceRequest}
                            onActionSuccess={getServiceRequests}
                        />
                    ))}
                </CardList>
            ) : (
                <Segment className={styles.NoServiceSegment} placeholder>
                    <Header icon>
                        <Icon name="search" />
                        You don't have any service requests
                        {paid !== '' || status !== '' ? ' matching your filters' : null}
                    </Header>
                    {paid !== '' || status !== '' ? (
                        <Button
                            size="large"
                            onClick={() => {
                                setPaid('');
                                setStatus('');
                            }}
                            primary>
                            Clear Filters
                        </Button>
                    ) : null}
                </Segment>
            )}
        </>
    );
};
