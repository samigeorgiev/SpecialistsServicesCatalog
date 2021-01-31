import React, { FunctionComponent, useEffect, useState } from 'react';
import TreeMenu, { Item, TreeNodeInArray } from 'react-simple-tree-menu';
import { Grid } from 'semantic-ui-react';
import { SpecialistsList } from '../../components/SpecialistsList';

export const Browse: FunctionComponent = () => {
    const [menuNodes, setMenuNodes] = useState<MenuNode[]>();
    const [selectedService, setSelectedService] = useState<number>();

    useEffect(() => {
        Promise.all([
            fetch(process.env.REACT_APP_GET_All_TAGS_URL!),
            fetch(process.env.REACT_APP_GET_All_SERVICES_URL!)
        ])
            .then(([getTagsResponse, getServicesResponse]: [Response, Response]) =>
                Promise.all([getTagsResponse.json(), getServicesResponse.json()])
            )
            .then(([getTagsResponse, getServicesResponse]: [GetTagsResponse, GetServicesResponse]) => {
                const tagsDto = getTagsResponse.tags;
                const services = getServicesResponse.services.reduce<{ [tagId: number]: MenuNode[] }>(
                    (accumulator, currentValue) => {
                        if (accumulator[currentValue.tagId] === undefined) {
                            accumulator[currentValue.tagId] = [];
                        }

                        accumulator[currentValue.tagId].push(convertServiceToTreeNode(currentValue));
                        return accumulator;
                    },
                    {}
                );
                const tags = tagsDto.map(tag => buildTagTreeNode(tag, services));
                setMenuNodes(tags);
            });
    }, []);

    const menuNodeClickHandler = (item: Item) => {
        const menuNode = (item as unknown) as MenuNode;
        if (!menuNode.isService) {
            return;
        }

        setSelectedService(menuNode.id);
    };

    return (
        <Grid>
            <Grid.Column width={4}>
                <TreeMenu data={menuNodes} onClickItem={menuNodeClickHandler} />
            </Grid.Column>
            <Grid.Column width={12}>
                <SpecialistsList serviceId={selectedService} />
            </Grid.Column>
        </Grid>
    );
};

const buildTagTreeNode = (tag: Tag, services: { [tagId: number]: MenuNode[] }): MenuNode => {
    return {
        key: `tag-${tag.id}`,
        label: tag.name,
        nodes: tag.childrenTags.map(tag => buildTagTreeNode(tag, services)).concat(services[tag.id] || []),
        id: tag.id,
        isService: false
    };
};

const convertServiceToTreeNode = (service: Service): MenuNode => {
    return {
        key: `service-${service.id}`,
        label: service.name,
        nodes: [],
        id: service.id,
        isService: true
    };
};

interface MenuNode extends TreeNodeInArray {
    id: number;
    isService: boolean;
}

interface GetTagsResponse {
    tags: Tag[];
}

interface Tag {
    id: number;
    name: string;
    parentTagId: number;
    childrenTags: Tag[];
}

interface Service {
    id: number;
    name: string;
    tag: string;
    tagId: number;
}

interface GetServicesResponse {
    services: Service[];
}
