import React, { useState, useCallback,  useEffect} from 'react'
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

    const [playersData, setPlayersData] = useState<PlayerData[]>();

    const [foundPlayersData, setFoundPlayersData] = useState<PlayerData[]>([]);

    const getOptions = useCallback((query: string): void => {
        getPlayers(query)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error('getPlayers error')
                }
                if (query.length === 0) {
                    setPlayersData(data.data);
                    setFoundPlayersData([]);
                } else {
                    setFoundPlayersData(data.data);
                }
            })
            .catch((err) => {
                console.log(err);
                // // fallback in case of too more requests
                // let filtered: PlayerData[] = playersData ? playersData.filter(function (player) {
                //     const name = player.first_name + ' ' + player.last_name;
                //     return name.toLowerCase().indexOf(query) !== -1;
                // }) : [];
                // setFoundPlayersData(filtered)
            })
    }, [playersData]);

    useEffect(() => {
        if (query.length !== 0 )
            getOptions(query)
    }, [getOptions, query]);


    const handleQuery = (e: React.FormEvent, formData: FormData): void => {

        if (e.currentTarget.tagName === 'FORM') {
            e.preventDefault();
        }
        const query: string = formData.name.toLowerCase();
        setQuery(query);
        if (query.length !== 0 )
            getPlayers(query)
                .then(({status, data}) => {
                    if (status !== 200) {
                        throw new Error('getPlayers error')
                    }
                    setFoundPlayersData(data.data);
                    if (query.length === 0) {
                        data.data.length === 0 && playersData ? setFoundPlayersData(playersData) : setFoundPlayersData(data.data);
                    }
            }).catch((err) => console.log(err))
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
