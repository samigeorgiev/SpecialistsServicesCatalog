import React, { FunctionComponent } from 'react';
import { FacebookShareButton } from 'react-share';
import { ServiceRequestDto } from '../../../../../../dtos/ServiceRequestDto';
import { Button } from 'semantic-ui-react';

export interface Props {
    serviceRequest: ServiceRequestDto;
}

export const ShareAction: FunctionComponent<Props> = props => {
    return (
        <FacebookShareButton
            url={`${'http://ssc.com:3000'}/shared-service-request?serviceRequestId=${props.serviceRequest.id}`}>
            <Button icon="facebook" color="facebook">
                Share
            </Button>
        </FacebookShareButton>
    );
};
