import React, { FunctionComponent, useState } from 'react';
import { FacebookShareButton } from 'react-share';
import { ServiceRequestDto } from '../../../../../../dtos/ServiceRequestDto';
import { Button, Form, Icon, Modal, Rating } from 'semantic-ui-react';
import styles from './ShareAction.module.scss';

export interface Props {
    serviceRequest: ServiceRequestDto;
}

export const ShareAction: FunctionComponent<Props> = props => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Modal
                size="large"
                as={Form}
                className={styles.Modal}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
                trigger={
                    <Button color="facebook">
                        <Icon name="facebook" />
                        Share
                    </Button>
                }
                centered={false}>
                <Modal.Header>Share Your Rating</Modal.Header>
                <Modal.Content className={styles.FormContent}>
                    <Rating rating={props.serviceRequest.rating} size="massive" icon="star" maxRating={10} disabled />
                    <Form.TextArea label="Comment" value={props.serviceRequest.comment} />
                </Modal.Content>
                <Modal.Actions>
                    <Button size="large" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <FacebookShareButton
                        url={`${'http://ssc.com:3000'}/shared-service-request?serviceRequestId=${
                            props.serviceRequest.id
                        }`}>
                        <Button size="large" color="facebook" onClick={() => setIsOpen(false)}>
                            <Icon name="facebook" />
                            Share
                        </Button>
                    </FacebookShareButton>
                </Modal.Actions>
            </Modal>
        </>
    );
};
