import React, {FunctionComponent, useState, useEffect} from 'react';
import {Card, CardText, ImgContainer} from './PlayerDataModal.style';
import Loader from './Loader'
import axios from 'axios'

export const PlayerDataModal: FunctionComponent<PlayerDataModalProps> = (props) => {

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
                const s = response.headers['content-type'].split(";")[0] === 'text/html' ? placeholder : src;
                cacheImages(s).then(() => setPlayerPhoto({src: s, loading: false}));
            });

    }, [src]);

    const imgBlock = playerPhoto.loading
        ? (<Loader/>)
        : (<img src={playerPhoto.src} alt={props.data.first_name}/>);

    return (
        <React.Fragment>
            <ImgContainer>{imgBlock}</ImgContainer>
            <Card>Team: <CardText>{props.data.team.full_name}</CardText></Card>
            <Card>Position: <CardText>{props.data.position}</CardText></Card>
        </React.Fragment>
    );
};