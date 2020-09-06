// https://nba-players.herokuapp.com/players/Anigbogu/Ike

import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'https://www.balldontlie.io/api/v1';

export const getPlayers = async (): Promise<AxiosResponse<AllPlayerData>> => {
    try {
        const result: AxiosResponse<AllPlayerData> = await axios.get(
            baseUrl + '/players/'
        );
        return result;
    } catch (error) {
        throw new Error(error)
    }
};

