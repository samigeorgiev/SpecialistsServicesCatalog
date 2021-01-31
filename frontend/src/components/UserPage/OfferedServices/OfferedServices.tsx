import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { Button, Form, List } from 'semantic-ui-react';
import { UserContext } from '../../../contexts/User/UserContext';

export const OfferedServices: FunctionComponent = () => {
    const { user } = useContext(UserContext);
    const [offeredServices, setOfferedServices] = useState<OfferedService[]>([]);
    const [allServices, setAllServices] = useState<SelectOption[]>([]);
    const [chosenService, setChosenService] = useState<any>();
    const [price, setPrice] = useState<string>('0');

    const fetchServices = useCallback(() => {
        if (user === null) {
            throw new Error('User is not logged in');
        }
        fetch(process.env.REACT_APP_GET_OFFERED_SERVICES_URL!, {
            headers: {
                Authorization: user.token
            }
        })
            .then(res => res.json())
            .then((services: OfferedService[]) => setOfferedServices(services));
    }, [user]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    useEffect(() => {
        fetch(process.env.REACT_APP_GET_All_SERVICES_URL!)
            .then(res => res.json())
            .then((servicesResponse: AllServicesResponse) => {
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

    const handleFormSubmit = async () => {
        await fetch(process.env.REACT_APP_POST_OFFERED_SERVICES_URL!, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: user!.token
            },
            body: JSON.stringify({
                serviceId: +chosenService,
                price: +price,
                isPrepaid: true
            })
        });
        fetchServices();
    };

    return (
        <>
            <List divided relaxed>
                {offeredServices.map(offeredService => (
                    <List.Item key={offeredService.service.id}>
                        <List.Header>{offeredService.service.name}</List.Header>
                        <List.Content>
                            <p>Tag: {offeredService.service.tag}</p>
                            <p>Price: {offeredService.price}</p>
                            <p>Is prepaid: {offeredService.prepaid ? 'true' : 'false'}</p>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
            <Form onSubmit={handleFormSubmit}>
                <Form.Select
                    options={allServices}
                    name="service"
                    onChange={(event, data) => setChosenService(data.value)}
                    value={chosenService}
                />
                <Form.Input
                    placeholder="Price"
                    type="number"
                    name="price"
                    value={price}
                    onChange={(event, data) => setPrice(data.value)}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </>
    );
};

interface OfferedService {
    service: Service;
    price: number;
    prepaid: boolean;
}

interface Service {
    id: number;
    name: string;
    tag: string;
}

interface AllServicesResponse {
    services: Service[];
}

interface SelectOption {
    key: string;
    text: string;
    value: string;
}
