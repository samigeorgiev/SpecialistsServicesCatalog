import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, DropdownItemProps, DropdownProps, Select } from 'semantic-ui-react';
import styles from './index.module.css';
import { useBecomeSpecialist } from '../../../hooks/UserActions/BecomeSpecialist/useBecomeSpecialist';
import { LocationDto } from '../../../dtos/LocationDto';
import { locationsService } from '../../../services/locationsService';

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
        <>
            <Select
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
                    locationChangeHandler(data)
                }
                options={locationsOptions}
                placeholder="Select location"
            />
            <Button onClick={() => doBecomeSpecialist(locationId)} className={styles.BecomeSpecialist}>
                Become specialist
            </Button>
        </>
    );
};
