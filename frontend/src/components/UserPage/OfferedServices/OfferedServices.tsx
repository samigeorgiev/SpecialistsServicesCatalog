import React, { FormEvent, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import { AuthModalContext } from '../../../contexts/AuthModal/AuthModalContext';
import { UserContext } from '../../../contexts/User/UserContext';
import { GetServicesResponse } from '../../../dtos/GetServicesResponse';
import { OfferedServiceDto } from '../../../dtos/OfferedServiceDto';
import { CardList } from '../../Common/Card/CardList/CardList';
import { AddServiceCard } from './AddServiceCard';
import { OfferedServiceCard } from './OfferedServiceCard';
import styles from './OfferedServices.module.scss';

export const OfferedServices: FunctionComponent = () => {
    const { user } = useContext(UserContext);
    const [offeredServices, setOfferedServices] = useState<OfferedServiceDto[]>([]);
    const [allServices, setAllServices] = useState<SelectOption[]>([]);
    const [chosenService, setChosenService] = useState<any>();
    const [price, setPrice] = useState<string>('0');
    const [isPrepaid, setIsPrepaid] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { openAuthenticationModalHandler } = useContext(AuthModalContext);

    const fetchServices = useCallback(() => {
        if (user === null) {
            openAuthenticationModalHandler();
            return;
        }
        fetch(process.env.REACT_APP_GET_OFFERED_SERVICES_URL!, {
            headers: {
                Authorization: user.token
            }
        })
            .then(res => res.json())
            .then((services: OfferedServiceDto[]) => setOfferedServices(services));
    }, [user, openAuthenticationModalHandler]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    useEffect(() => {
        fetch(process.env.REACT_APP_GET_All_SERVICES_URL!)
            .then(res => res.json())
            .then((servicesResponse: GetServicesResponse) => {
                const servicesSelectOptions = servicesResponse.services.map(
                    (service): SelectOption => ({
                        key: service.id.toString(),
                        text: service.name,
                        value: service.id.toString()
                    })
                );
                setAllServices(servicesSelectOptions);
            });
    }, []);

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!chosenService || price === '0' || !price) {
            return;
        }

        const response = await fetch(process.env.REACT_APP_POST_OFFERED_SERVICES_URL!, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: user!.token
            },
            body: JSON.stringify({
                serviceId: +chosenService,
                price: +price,
                isPrepaid
            })
        });

        if (!response.ok) {
            toast.error('Error: Could not create service.');
            closeHandler();
            setPrice('0');
            setChosenService('');
        }

        closeHandler();
        setPrice('0');
        setChosenService('');
        fetchServices();
    };

    const closeHandler = useCallback(() => {
        setIsOpen(false);
    }, []);

    const openHander = useCallback(() => {
        setIsOpen(true);
    }, []);

    return (
        <>
            {offeredServices.length !== 0 ? (
                <CardList>
                    {offeredServices.map(offeredService => (
                        <OfferedServiceCard key={offeredService.id} offeredService={offeredService} />
                    ))}
                    <AddServiceCard onClick={openHander} />
                </CardList>
            ) : (
                <Segment className={styles.NoServiceSegment} placeholder>
                    <Header icon>
                        <Icon name="search" />
                        You have no active offers at the moment.
                    </Header>
                    <Button size="large" onClick={openHander} primary>
                        Add Service
                    </Button>
                </Segment>
            )}
            <Modal
                className={styles.Modal}
                as={Form}
                size="large"
                open={isOpen}
                onClose={closeHandler}
                onSubmit={handleFormSubmit}
                centered={false}>
                <Modal.Header>Add Service</Modal.Header>
                <Modal.Content>
                    <Form.Select
                        label="Service"
                        options={allServices}
                        name="service"
                        onChange={(event, data) => setChosenService(data.value)}
                        value={chosenService}
                    />
                    <Form.Input
                        label="Price"
                        placeholder="Price"
                        type="number"
                        name="price"
                        value={price}
                        onChange={(event, data) => setPrice(data.value)}
                    />
                    <Form.Checkbox checked={isPrepaid} onChange={() => setIsPrepaid(i => !i)} label="Prepaid" />
                </Modal.Content>
                <Modal.Actions>
                    <Button size="large" onClick={closeHandler}>
                        Cancel
                    </Button>
                    <Button size="large" primary type="submit">
                        Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

interface SelectOption {
    key: string;
    text: string;
    value: string;
}
