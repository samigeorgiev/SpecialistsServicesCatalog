import React, { FunctionComponent, useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { UserContext } from '../../../contexts/User/UserContext';
import { Route, RoutesGroup, RoutesGroupType } from '../../../pages/UserPage/routes';

interface Props {
    onItemSelect: (itemPath: string) => void;
    items: RoutesGroup[];
}

export const UserMenu: FunctionComponent<Props> = props => {
    const { user } = useContext(UserContext);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const itemClickHandler = (item: Route) => {
        setActiveItem(item.name);
        props.onItemSelect(item.path);
    };

    const buildMenuItemForRoutesGroup = (routesGroup: RoutesGroup) => {
        return (
            <Menu.Item>
                <Menu.Header>{routesGroup.name}</Menu.Header>
                <Menu.Menu>
                    {routesGroup.routes.map(route => (
                        <Menu.Item
                            name={route.name}
                            active={route.name === activeItem}
                            onClick={() => itemClickHandler(route)}
                            key={route.path}
                        />
                    ))}
                </Menu.Menu>
            </Menu.Item>
        );
    };

    const userItems = props.items.find(item => item.type === RoutesGroupType.USER)!;
    const specialistItems = props.items.find(item => item.type === RoutesGroupType.SPECIALIST)!;
    const nonSpecialistItems = props.items.find(item => item.type === RoutesGroupType.NON_SPECIALIST)!;

    return (
        <Menu vertical tabular fluid>
            {buildMenuItemForRoutesGroup(userItems)}
            {user?.isSpecialist
                ? buildMenuItemForRoutesGroup(specialistItems)
                : buildMenuItemForRoutesGroup(nonSpecialistItems)}
        </Menu>
    );
};
