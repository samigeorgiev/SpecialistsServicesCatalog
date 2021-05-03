import React, { FunctionComponent } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

interface Props {
    maxWidth?: number;
    minWidth?: number;
    maxHeight?: number;
    minHeight?: number;
}

export const WithMediaQuery: FunctionComponent<Props> = props => {
    const { height, width } = useWindowSize();

    if (props.maxWidth && props.maxWidth >= width) return null;
    if (props.minWidth && props.minWidth < width) return null;
    if (props.maxHeight && props.maxHeight >= height) return null;
    if (props.minHeight && props.minHeight < height) return null;

    return <>{props.children}</>;
};
