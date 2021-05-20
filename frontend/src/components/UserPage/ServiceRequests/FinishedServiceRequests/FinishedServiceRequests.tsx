import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../contexts/User/UserContext';
import { ServiceRequestDto } from '../../../../dtos/ServiceRequestDto';
import { usersService } from '../../../../services/usersService';
import { toast } from 'react-toastify';
import { Input, List, Rating, RatingProps } from 'semantic-ui-react';
import { serviceRequestsService } from '../../../../services/serviceRequestsService';
import { FacebookShareButton } from 'react-share';
import { ServiceRequestStatus } from '../../../../dtos/ServiceRequestStatus';
import { AuthModalContext } from '../../../../contexts/AuthModal/AuthModalContext';

export interface Props {}

export const FinishedServiceRequests: FunctionComponent<Props> = () => {
    const { user } = useContext(UserContext);
    const { openAuthenticationModalHandler } = useContext(AuthModalContext);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequestDto[]>([]);

    const getServiceRequests = useCallback(() => {
        if (user === null) {
            openAuthenticationModalHandler();
            return;
        }
        usersService
            .getServiceRequests(user, ServiceRequestStatus.FINISHED, true)
            .then(response => {
                setServiceRequests(response.data.serviceRequests);
            })
            .catch(error => {
                toast.error('Error: Could not get services.');
            });
    }, [user, openAuthenticationModalHandler]);

    useEffect(() => {
        getServiceRequests();
    }, [getServiceRequests]);

    const rateHandler = (serviceRequestId: number, ratingProps: RatingProps) => {
        if (user === null) {
            openAuthenticationModalHandler();
            return;
        }
        serviceRequestsService
            .rateServiceRequest(user, serviceRequestId, ratingProps.rating as number)
            .then(() => {
                getServiceRequests();
            })
            .catch(error => {
                toast.error('Error: Rating was not saved.');
            });
    };

    const commentHandler = (serviceRequestId: number) => {
        if (user === null) {
            openAuthenticationModalHandler();
            return;
        }
        serviceRequestsService
            .commentServiceRequest(user, serviceRequestId, 'Comment')
            .then(() => {
                getServiceRequests();
            })
            .catch(error => {
                toast.error('Error: Comment was not saved.');
            });
    };

    return (
        <List divided relaxed>
            {serviceRequests.map(serviceRequest => (
                <List.Item key={serviceRequest.id}>
                    <List.Header>{serviceRequest.requestedService.price}</List.Header>
                    <List.Content>
                        <p>Service: {serviceRequest.requestedService.service.name}</p>
                        {serviceRequest.comment == null ? (
                            <Input
                                placeholder="Comment"
                                action={{
                                    onClick: () => commentHandler(serviceRequest.id),
                                    content: 'submit'
                                }}
                            />
                        ) : (
                            <p>Comment: {serviceRequest.comment}</p>
                        )}
                        <br />
                        {serviceRequest.rating === 0 ? (
                            <Rating
                                maxRating={10}
                                onRate={(_event: React.MouseEvent<HTMLDivElement>, ratingProps: RatingProps) =>
                                    rateHandler(serviceRequest.id, ratingProps)
                                }
                            />
                        ) : (
                            <Rating defaultRating={serviceRequest.rating} maxRating={10} disabled />
                        )}
                        <FacebookShareButton
                            url={`${'http://ssc.com:3000'}/shared-service-request?serviceRequestId=${
                                serviceRequest.id
                            }`}>
                            Share
                        </FacebookShareButton>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    );
};
