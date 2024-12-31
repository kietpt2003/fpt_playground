export type SlotItemType = {
    id?: string,
    groupName?: string,
    imageUrl?: string,
    status?: string,
    index: number
}

export type SlotItemProps = {
    item: SlotItemType; // `item` có thể là null hoặc không được truyền
};

export type SlotListProps = {
    data: SlotItemType[]
}