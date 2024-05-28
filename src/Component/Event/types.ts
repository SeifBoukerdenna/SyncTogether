export type EventType = {
    id: number;
    title: string;
    hour: string;
    date: string;
    description: string;
    tags?: tag[];
}

export enum tag {
    Big_event = "Big Event",
    Bonding = "Bonding",
    Adventure = "Adventure",
    Studying = "Studying",
    Chilling = "Chilling",
    Celebration = "Celebration",
    Romantic = "Romantic",
    Fitness = "Fitness",
    Food = "Food",
    Work = "Work",
    Shopping = "Shopping",
}

export type EventTagType = {
    tag: tag;
    color: string;
}

export const tagColors: { [key in tag]: string } = {
    [tag.Big_event]: "#FF5733",      // Big Event - Red
    [tag.Bonding]: "#33FF57",        // Bonding - Green
    [tag.Adventure]: "#3375FF",      // Adventure - Blue
    [tag.Studying]: "#FF33A6",       // Studying - Pink
    [tag.Chilling]: "#33FFF3",       // Chilling - Aqua
    [tag.Celebration]: "#FFD733",    // Celebration - Yellow
    [tag.Romantic]: "#FF3385",       // Romantic - Dark Pink
    [tag.Fitness]: "#33FF88",        // Fitness - Light Green
    [tag.Food]: "#FF8C33",           // Food - Orange
    [tag.Work]: "#8C33FF",           // Work - Purple
    [tag.Shopping]: "#FF33C1"        // Shopping - Magenta
};