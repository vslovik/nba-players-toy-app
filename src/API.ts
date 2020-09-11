// https://nba-players.herokuapp.com/players/Anigbogu/Ike

import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'https://www.balldontlie.io/api/v1';

export const getPlayers = (query:string): Promise<AxiosResponse<AllPlayerData>> => {
    try {
        return axios.get(
            baseUrl + '/players?per_page=100&search=' + query
        );
    } catch (error) {
        throw new Error(error)
    }
};

