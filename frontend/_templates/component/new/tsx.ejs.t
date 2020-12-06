---
to: src/<%= path %>/<%= Name %>/<%= Name %>.tsx
---
import React, { FunctionComponent } from 'react';

export interface Props {}

export const <%= Name %>: FunctionComponent<Props> = () => {
    return <h1><%= Name %></h1>;
};
