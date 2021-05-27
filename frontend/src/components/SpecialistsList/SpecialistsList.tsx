import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {
    Button,
    DropdownItemProps,
    DropdownProps,
    Form,
    Header,
    Icon,
    Rating,
    RatingProps,
    Segment
} from 'semantic-ui-react';
import {UserContext} from '../../contexts/User/UserContext';
import {serviceRequestsService} from '../../services/serviceRequestsService';
import {toast} from 'react-toastify';
import {servicesService} from '../../services/servicesService';
import {OfferedServiceDto} from '../../dtos/OfferedServiceDto';
import {LocationDto} from '../../dtos/LocationDto';
import {locationsService} from '../../services/locationsService';
import styles from './SpecialistsList.module.scss';
import {SpecialistCard} from './SpecialistCard';
import {AuthModalContext} from '../../contexts/AuthModal/AuthModalContext';
import {CardList} from '../Common/Card/CardList/CardList';

export interface Props {
    serviceId?: number;
}

export const SpecialistsList: FunctionComponent<Props> = props => {
    const {user} = useContext(UserContext);
    const {openAuthenticationModalHandler} = useContext(AuthModalContext);
    const [offeredServices, setOfferedServices] = useState<OfferedServiceDto[]>([]);
    const [locations, setLocations] = useState<LocationDto[]>([]);
    const [locationId, setLocationId] = useState<number | string>('');
    const [minimumRating, setMinimumRating] = useState<number | string>('');
    const [maximumPrice, setMaximumPrice] = useState<number | string>('');

    useEffect(() => {
        locationsService
                .getLocations()
                .then(response => {
                    setLocations(response.data.locations);
                })
                .catch(() => {
                    toast.error('Error: Could not get locations');
                });
    }, []);

    useEffect(() => {
        if (props.serviceId === undefined) return;

        const locId = typeof locationId === 'string' ? undefined : locationId;
        const minRating = typeof minimumRating === 'string' ? undefined : minimumRating;
        const maxPrice = typeof maximumPrice === 'string' ? undefined : maximumPrice;

        servicesService.getOfferedServices(props.serviceId, locId, minRating, maxPrice).then(response => {
            setOfferedServices(response.data.offeredServices);
        });
    }, [locationId, maximumPrice, minimumRating, props.serviceId]);

    const locationChangeHandler = (data: DropdownProps) => {
        const value = data.value as number;
        setLocationId(+value || '');
    };

    const minimumRatingChangeHandler = (data: RatingProps) => {
        const value = data.rating as number;
        setMinimumRating(+value || '');
    };

    // const maximumPriceChangeHandler = (data: DropdownProps) => {
    //     const value = data.value as number;
    //     setMaximumPrice(+value || '');
    // };

    const requestServiceHandler = (requestedServiceId: number) => {
        if (user === null) {
            openAuthenticationModalHandler();
            return;
        }

        serviceRequestsService
                .makeServiceRequest(user, {requestedServiceId})
                .then(() => {
                    toast.success('Service request made successfully');
                })
                .catch(() => {
                    toast.error('Error: Could not request service.');
                });
    };

    const locationsOptions: DropdownItemProps[] = locations.map(location => ({
        key: location.id,
        value: location.id,
        text: location.name
    }));
    locationsOptions.push({
        key: 'any',
        value: '',
        text: 'Any'
    });

    return (
            <>
                <Form className={styles.ServiceFilters} size="large">
                    <Form.Select
                            onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
                                    locationChangeHandler(data)
                            }
                            value={locationId}
                            options={locationsOptions}
                            placeholder="Select location"
                    />
                    <Rating
                            maxRating={10}
                            size="massive"
                            icon="star"
                            rating={minimumRating}
                            onRate={(event: React.MouseEvent<HTMLDivElement>, ratingProps: RatingProps) =>
                                    minimumRatingChangeHandler(ratingProps)
                            }
                    />
                </Form>
                {offeredServices.length !== 0 ? (
                        <CardList>
                            {offeredServices.map(offeredService => (
                                    <SpecialistCard
                                            key={offeredService.id}
                                            offeredService={offeredService}
                                            onServiceRequest={requestServiceHandler}
                                    />
                            ))}
                        </CardList>
                ) : (
                        <Segment className={styles.NoServiceSegment} placeholder>
                            <Header icon>
                                <Icon name="search"/>
                                {locationId
                                        ? "We don't have any specialists matching your filters."
                                        : 'Please select the type of service you are looking for.'}
                            </Header>
                            {locationId || minimumRating || maximumPrice ? (
                                    <Button size="large" onClick={() => {
                                        setLocationId('');
                                        setMaximumPrice('');
                                        setMinimumRating('');
                                    }} primary>
                                        Clear Filters
                                    </Button>
                            ) : null}
                        </Segment>
                )}
            </>
    );
};
