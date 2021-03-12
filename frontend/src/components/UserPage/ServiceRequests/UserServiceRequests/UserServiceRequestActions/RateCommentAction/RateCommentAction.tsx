import React, { FunctionComponent, useContext, useState } from 'react';
import { ServiceRequestDto } from '../../../../../../dtos/ServiceRequestDto';
import { Input, InputOnChangeData, Rating, RatingProps } from 'semantic-ui-react';
import { serviceRequestsService } from '../../../../../../services/serviceRequestsService';
import { toast } from 'react-toastify';
import { UserContext } from '../../../../../../contexts/User/UserContext';

export interface Props {
    serviceRequest: ServiceRequestDto;
}

export const RateCommentAction: FunctionComponent<Props> = props => {
    const [comment, setComment] = useState('');
    const { user } = useContext(UserContext);

    const rateHandler = (ratingProps: RatingProps) => {
        if (user === null) {
            throw new Error('User is null');
        }
        serviceRequestsService
            .rateServiceRequest(user, props.serviceRequest.id, ratingProps.rating as number)
            .then(() => {
                toast.success('Successfully rated');
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    const commentHandler = () => {
        if (user === null) {
            throw new Error('User is null');
        }
        serviceRequestsService
            .commentServiceRequest(user, props.serviceRequest.id, comment)
            .then(() => {
                toast.success('Successfully commented');
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    const commentInput =
        props.serviceRequest.comment === null ? (
            <Input
                placeholder="Comment"
                value={comment}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) =>
                    setComment(data.value)
                }
                action={{
                    onClick: commentHandler,
                    content: 'submit'
                }}
            />
        ) : (
            <Input value={props.serviceRequest.comment} disabled />
        );

    const ratingInput =
        props.serviceRequest.rating === 0 ? (
            <Rating
                maxRating={10}
                onRate={(event: React.MouseEvent<HTMLDivElement>, ratingProps: RatingProps) => rateHandler(ratingProps)}
            />
        ) : (
            <Rating rating={props.serviceRequest.rating} maxRating={10} disabled />
        );

    return (
        <>
            {commentInput}
            {ratingInput}
        </>
    );
};
