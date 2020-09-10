import React, {useState} from 'react'
import {useEffect} from 'react'
import PlayerDataBlock from './components/PlayerListItem'
import SearchForm from './components/SearchForm'
import {Modal} from './components/Modal';
import {PlayerDataModal} from './components/PlayerDataModal';
import {useModal} from './hooks/UseModal'
import {getPlayers} from './API'
import {Card, CardText} from './components/PlayerListItem.style';

const App: React.FC = () => {

    const PLAYERS_TO_SHOW = 10;

    const [query, setQuery] = useState<string>('');
    const {isShown, toggle} = useModal();
    const [playerData, setData] = useState<PlayerData>({
        id: '',
        first_name: '',
        last_name: '',
        height_feet: '',
        height_inches: '',
        position: '',
        team: {full_name: ''},
        weight_pounds: ''
    });

    const [playersData, setPlayersData] = useState<PlayerData[]>();

    const [foundPlayersData, setFoundPlayersData] = useState<PlayerData[]>([]);

    const getOptions = (): void => {
        getPlayers()
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error('getPlayers error')
                }
                setPlayersData(data.data);
                if (query.length === 0) {
                    setFoundPlayersData(data.data)
                }
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        getOptions()
    }, []);

    const handleQuery = (e: React.FormEvent, formData: FormData): void => {

        if (e.currentTarget.tagName === 'FORM') {
            e.preventDefault();
        }
        const query: string = formData.name.toLowerCase();
        let filtered: PlayerData[] = playersData ? playersData.filter(function (player) {
            return player.first_name.toLowerCase().indexOf(query) !== -1
                || player.last_name.toLowerCase().indexOf(query) !== -1;
        }) : [];
        filtered.length === 0 && playersData ? setFoundPlayersData(playersData) : setFoundPlayersData(filtered);
        setQuery(query)
    };

    let more = foundPlayersData.length > PLAYERS_TO_SHOW ? (
        <Card>
            <CardText>
                ...
            </CardText>
        </Card>
    ) : (<React.Fragment/>);

    return (
        <main className='App'>
            <h1>My Favorite NBA Player</h1>
            <SearchForm getPlayerResult={handleQuery}/>
            {foundPlayersData.slice(0, PLAYERS_TO_SHOW).map((player: PlayerData) => (
                <PlayerDataBlock
                    highlight={query}
                    key={player.id}
                    data={player}
                    onClick={() => {
                        toggle();
                        setData(player)
                    }}
                />
            ))}
            {more}
            <React.Fragment>
                <Modal
                    isShown={isShown}
                    hide={toggle}
                    modalContent={
                        <PlayerDataModal
                            data={playerData}
                        />
                    }
                    headerText={playerData.first_name + ' ' + playerData.last_name}
                />
            </React.Fragment>
        </main>
    )
};

export default App
