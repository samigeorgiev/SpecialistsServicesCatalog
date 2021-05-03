import React, { FunctionComponent, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Modal, Rating, RatingProps } from 'semantic-ui-react';
import { AuthModalContext } from '../../../../../../contexts/AuthModal/AuthModalContext';
import { UserContext } from '../../../../../../contexts/User/UserContext';
import { ServiceRequestDto } from '../../../../../../dtos/ServiceRequestDto';
import { serviceRequestsService } from '../../../../../../services/serviceRequestsService';
import styles from './RateCommentAction.module.scss';

export interface Props {
    serviceRequest: ServiceRequestDto;
    onActionSuccess: () => void;
}

export const RateCommentAction: FunctionComponent<Props> = props => {
    const [comment, setComment] = useState('');
    const { user } = useContext(UserContext);
    const { openAuthenticationModalHandler } = useContext(AuthModalContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const rateHandler = (ratingProps: RatingProps) => {
        if (user === null) {
            // throw new Error('User is null');
            openAuthenticationModalHandler();
            return;
        }
        serviceRequestsService
            .rateServiceRequest(user, props.serviceRequest.id, ratingProps.rating as number)
            // .then(() => {
            //     toast.success('Successfully rated');
            // })
            .catch(error => {
                toast.error('Error: Rating was not saved');
            });
    };

    const commentHandler = () => {
        if (user === null) {
            // throw new Error('User is null');
            openAuthenticationModalHandler();
            return;
        }
        serviceRequestsService
            .commentServiceRequest(user, props.serviceRequest.id, comment)
            .then(() => {
                // toast.success('Successfully commented');
                props.onActionSuccess();
            })
            .catch(error => {
                toast.error('Error: Comment was not saved.');
            })
            .finally(() => setIsOpen(false));
    };

    const commentInput =
        props.serviceRequest.comment === null ? (
            <Form.TextArea
                placeholder="Comment"
                label="Comment"
                value={comment}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value)}
            />
        ) : (
            <Form.TextArea placeholder="Comment" label="Comment" value={props.serviceRequest.comment} />
        );

    const ratingInput =
        props.serviceRequest.rating === 0 ? (
            <Rating
                maxRating={10}
                size="massive"
                icon="star"
                onRate={(event: React.MouseEvent<HTMLDivElement>, ratingProps: RatingProps) => rateHandler(ratingProps)}
            />
        ) : (
            <Rating rating={props.serviceRequest.rating} size="massive" icon="star" maxRating={10} disabled />
        );

    return (
        <>
            <Modal
                size="large"
                as={Form}
                className={styles.Modal}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
                trigger={<Button primary>Rate</Button>}
                centered={false}>
                <Modal.Header>Leave a Rating</Modal.Header>
                <Modal.Content className={styles.FormContent}>
                    {ratingInput}
                    {commentInput}
                </Modal.Content>
                <Modal.Actions>
                    <Button size="large" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button size="large" primary onClick={commentHandler}>
                        Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};
