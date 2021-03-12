export interface TagDto {
    id: number;
    name: string;
    parentTagId?: number;
    childrenTags: TagDto[];
}
