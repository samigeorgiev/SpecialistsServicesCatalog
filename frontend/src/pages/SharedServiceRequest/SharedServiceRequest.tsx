import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { serviceRequestsService } from '../../services/serviceRequestsService';
import { ServiceRequestDto } from '../../dtos/ServiceRequestDto';
import { toast } from 'react-toastify';
import { Card, Dimmer, Form, Header, Image, Label, Loader, Rating, Segment } from 'semantic-ui-react';
import styles from './SharedServiceRequest.module.scss';
import { CardLabel } from '../../components/Common/Card/CardLabel';
import { CardContent } from '../../components/Common/Card/CardContent';

export interface Props {}

export const SharedServiceRequest: FunctionComponent<Props> = () => {
    const [serviceRequest, setServiceRequest] = useState<ServiceRequestDto>();
    const history = useHistory();
    const { search } = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(search);
        const serviceRequestId = queryParams.get('serviceRequestId');
        if (serviceRequestId === null) {
            // throw new Error('ServiceRequests is null');
            history.push('/not-found');
            return;
        }
        serviceRequestsService
            .getServiceRequest(+serviceRequestId)
            .then(response => {
                setServiceRequest(response.data.serviceRequest);
            })
            .catch(error => {
                toast.error('Error: Service not found');
            });
    }, [search, history]);

    return serviceRequest === undefined ? (
        <Dimmer active inverted>
            <Loader inverted content="Loading" size="large" />
        </Dimmer>
    ) : (
        <>
            <Card fluid>
                <CardLabel>{serviceRequest.requestedService.service.tag}</CardLabel>
                <CardContent>
                    <Header size="huge">{serviceRequest.requestedService.specialist.name}</Header>
                    <Label color="purple">{serviceRequest.requestedService.service.name}</Label>
                </CardContent>
                <Card.Content className={styles.Card} extra>
                    <p className={styles.Price}>{serviceRequest.requestedService.price}лв.</p>
                </Card.Content>
            </Card>

            <Card className={styles.ReviewCard} fluid>
                <Card.Content>
                    <Header size="large">Review</Header>
                    <p>
                        <strong>from: </strong> {serviceRequest.requestorName}
                    </p>
                    <Rating rating={serviceRequest.rating} size="massive" icon="star" maxRating={10} disabled />
                    <Form>
                        <Form.TextArea placeholder="Comment" label="Comment" value={serviceRequest.comment} />
                    </Form>
                </Card.Content>
            </Card>
        </>
    );
};
