interface FormData {
    name: string
}

interface Team {
    full_name: string
}

interface PlayerData {
    id: string
    first_name: string
    last_name: string
    height_feet: string
    height_inches: string
    position: string
    team: Team
    weight_pounds: string
}

interface AllPlayerMeta {
    total_pages: number
    current_page: number
    next_page: number
    per_page: number
    total_count: number
}

interface AllPlayerData {
    data: PlayerData[];
    meta: AllPlayerMeta
}

interface PlayerDataBlockProps {
    data: PlayerData;
    onClick: () => void;
    highlight: string;

}

interface PlayerDataModalProps {
    data: PlayerData;
}

interface HighlightProps {
    children:string;
    highlight: string;
}

interface PlayerPhoto {
    src: imgSrc;
    loading: boolean;
}