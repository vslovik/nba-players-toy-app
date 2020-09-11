import React, { useState } from 'react'
import PlayerListItem from './components/PlayerListItem'
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
        team: {
            full_name: '',
            abbreviation: '',
            city: '',
            conference: '',
            division: ''
        },
        weight_pounds: ''
    });

    const [foundPlayersData, setFoundPlayersData] = useState<PlayerData[]>([]);

    const handleQuery = (e: React.FormEvent, formData: FormData): void => {

        if (e.currentTarget.tagName === 'FORM') {
            e.preventDefault();
        }
        const query: string = formData.name.toLowerCase();
        console.log('SET QUERY', query);
        setQuery(query);
        console.log('HANDLE QUERY', query);
        if (query.length === 0) {
            setFoundPlayersData([]);
            return;
        }
        getPlayers(query)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error('getPlayers error')
                }
                console.log('SET FOUND', data.data[0]);
                setFoundPlayersData(data.data);
            }).catch((err) => {
                console.log(err);
            })
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
                <PlayerListItem
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
