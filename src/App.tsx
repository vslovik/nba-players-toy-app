import React, {useState} from 'react'
import {useEffect} from 'react'
import PlayerDataBlock from './components/PlayerDataBlock'
import SearchPlayer from './components/SearchPlayer'
import { Modal } from './components/Modal';
import { PlayerDataModal } from './components/PlayerDataModal';

import {useModal} from './hooks/useModal'
import { getPlayers } from './API'

const App: React.FC = () => {
    const { isShown, toggle } = useModal();
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

    useEffect(() => {
        getOptions()
    }, []);

    const [playersData, setPlayersData] = useState<PlayerData[]>();

    const [foundPlayersData, setFoundPlayersData] = useState<PlayerData[]>([]);

    const getOptions = (): void => {
        getPlayers()
            .then(({ status, data }) => {
                if (status !== 200) {
                    throw new Error('getPlayers error')
                }
                setPlayersData(data.data)
            })
            .catch((err) => console.log(err))
    };

    const handleQuery = (e: React.FormEvent, formData: FormData): void => {
      e.preventDefault();
      setFoundPlayersData(playersData ? playersData.filter(function(player) {
          return formData.name === player.first_name || formData.name === player.last_name;
      }): []);
    };

    return (
        <main className='App'>
          <h1>My Favorite NBA Player</h1>
            <SearchPlayer getPlayerResult={handleQuery} />
            {foundPlayersData.map((player: PlayerData) => (
                <PlayerDataBlock
                    data={player}
                    onClick={() => {toggle(); setData(player)}}
                />
            ))}
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
