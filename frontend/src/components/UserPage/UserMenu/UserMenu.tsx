import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Menu } from 'semantic-ui-react';
import { UserContext } from '../../../contexts/User/UserContext';
import { RoutesGroup, RoutesGroupType } from '../../../pages/UserPage/routes';

interface Props {
    onItemSelect: (itemPath: string) => void;
    items: RoutesGroup[];
}

export const UserMenu: FunctionComponent<Props> = props => {
    const { user } = useContext(UserContext);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const { pathname } = useLocation();

    useEffect(() => {
        const active = props.items
            .flatMap(routesGroup => routesGroup.routes)
            .find(route => '/user/' + route.path === pathname);

        const name = active ? active.name : null;

        setActiveItem(name);
    }, [pathname, props.items]);

    const buildMenuItemForRoutesGroup = (routesGroup: RoutesGroup) => {
        return (
            <Menu.Item>
                <Menu.Header>{routesGroup.name}</Menu.Header>
                <Menu.Menu>
                    {routesGroup.routes.map(route => (
                        <Menu.Item
                            color="blue"
                            name={route.name}
                            active={route.name === activeItem}
                            onClick={() => props.onItemSelect(route.path)}
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
        <Menu size="huge" vertical fluid>
            {buildMenuItemForRoutesGroup(userItems)}
            {user?.isSpecialist
                ? buildMenuItemForRoutesGroup(specialistItems)
                : buildMenuItemForRoutesGroup(nonSpecialistItems)}
        </Menu>
    );
};
