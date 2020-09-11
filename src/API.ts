// https://nba-players.herokuapp.com/players/Anigbogu/Ike

import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'https://www.balldontlie.io/api/v1';

export const getPlayers = async (query:string): Promise<AxiosResponse<AllPlayerData>> => {
    try {
        return await axios.get(
            baseUrl + '/players?search=' + query
        );
    } catch (error) {
        throw new Error(error)
    }
};

