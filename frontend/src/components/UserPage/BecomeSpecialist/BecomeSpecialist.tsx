import React, { FunctionComponent, useEffect, useState } from 'react';
import { Card, DropdownItemProps, DropdownProps, Form, Header } from 'semantic-ui-react';
import { LocationDto } from '../../../dtos/LocationDto';
import { useBecomeSpecialist } from '../../../hooks/UserActions/BecomeSpecialist/useBecomeSpecialist';
import { locationsService } from '../../../services/locationsService';
import styles from './index.module.scss';

export const BecomeSpecialist: FunctionComponent = () => {
    const [locations, setLocations] = useState<LocationDto[]>([]);
    const [locationId, setLocationId] = useState(0);
    const { doBecomeSpecialist } = useBecomeSpecialist();

    useEffect(() => {
        locationsService.getLocations().then(response => {
            setLocations(response.data.locations);
        });
    }, [setLocations]);

    const locationChangeHandler = (data: DropdownProps) => {
        const value = data.value as number;
        setLocationId(value);
    };

    const locationsOptions: DropdownItemProps[] = locations.map(location => ({
        key: location.id,
        value: location.id,
        text: location.name
    }));

    return (
        <Card className={styles.BecomeSpecialist} fluid>
            <Card.Content>
                <Form
                    size="large"
                    onSubmit={event => {
                        event.preventDefault();
                        doBecomeSpecialist(locationId);
                    }}>
                    <Header size="large">Become a Specialist</Header>
                    <Form.Select
                        label="Location"
                        onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
                            locationChangeHandler(data)
                        }
                        options={locationsOptions}
                        placeholder="Select location"
                    />
                    <Form.Button type="submit" primary size="large" fluid>
                        Become specialist
                    </Form.Button>
                </Form>
            </Card.Content>
        </Card>
    );
};
