import React, {FunctionComponent, useState, useEffect} from 'react';
import {Message, ImgContainer} from './PlayerDataModal.style';
import Loader from './Loader'
import axios from 'axios'

export const PlayerDataModal: FunctionComponent<PlayerDataModalProps> = (props) => {
    // const placeholder = "https://via.placeholder.com/350x254?text=Loading+Photo";
    const placeholder = "noimage350x254.png";
    const src = "https://nba-players.herokuapp.com/players/" + props.data.last_name + "/" + props.data.first_name;

    const [playerPhoto, setPlayerPhoto] = useState<PlayerPhoto>({src: '', loading: true});

    const cacheImages = async (src: string): Promise<any> => {

        const preloadImage = (src: string) => {
            new Promise(r => {
                const image = new Image();
                image.onload = r;
                image.onerror = r;
                image.src = src;
            });
        };

        return preloadImage(src)
    };

    useEffect(() => {
        axios.get(src)
            .then((response) => {
                console.log('HEADERS', response.headers['content-type'].split(";")[0] === 'text/html');
                const s = response.headers['content-type'].split(";")[0] === 'text/html' ? placeholder : src;
                cacheImages(s).then(() => setPlayerPhoto({src: s, loading: false}));
            });

    }, []);

    const imgBlock = playerPhoto.loading
        ? (<Loader/>)
        : (<img src={playerPhoto.src} alt={props.data.first_name}/>);

    return (
        <React.Fragment>
            <ImgContainer>{imgBlock}</ImgContainer>
            {/*<Message>Height: {props.data.height_feet} feet ({props.data.height_inches} inches)</Message>*/}
            {/*<Message>Weight: {props.data.weight_pounds} pounds</Message>*/}
            <Message>Team: {props.data.team.full_name}</Message>
            <Message>Position: {props.data.position}</Message>
        </React.Fragment>
    );
};