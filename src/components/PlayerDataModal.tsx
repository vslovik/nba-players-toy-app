import React, {FunctionComponent, useState} from 'react';
import { Message } from './PlayerDataModal.style';
import axios from 'axios'

export const PlayerDataModal: FunctionComponent<PlayerDataModalProps> = (props) => {
    const placeholder = "https://via.placeholder.com/350x254?text=No+Player+Photo";
    const src = "https://nba-players.herokuapp.com/players/" + props.data.last_name + "/" + props.data.first_name;

    const [imgSrc, setSrc] = useState<string>(placeholder);

    axios.head(src)
        .then((response) => {
            console.log('HEADERS', response.headers['content-type'].split(";")[0] === 'text/html');
            if (response.headers['content-type'].split(";")[0] !== 'text/html') {
                setSrc(src)
            }
        });

    return (
        <React.Fragment>
            <img src={imgSrc} alt={props.data.first_name}/>
            {/*<Message>Height: {props.data.height_feet} feet ({props.data.height_inches} inches)</Message>*/}
            {/*<Message>Weight: {props.data.weight_pounds} pounds</Message>*/}
            <Message>Team: {props.data.team.full_name}</Message>
            <Message>Position: {props.data.position}</Message>
        </React.Fragment>
    );
};