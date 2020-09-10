import React, {useState} from 'react'
import {Form, Input, Label} from './SearchForm.style';

type Props = {
    getPlayerResult: (e: React.FormEvent, formData: PlayerData | any) => void
}

const SearchForm: React.FC<Props> = ({getPlayerResult}) => {

    const [formData, setFormData] = useState<PlayerData | {}>();

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        });
        getPlayerResult(e, {
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    };

    return (
        <Form onSubmit={(e) => getPlayerResult(e, formData)}>
            <Label htmlFor='name'>Player Name:</Label>
            <Input onChange={handleForm} type='text' id='name' onKeyDown={handleForm}/>
        </Form>
    )
};

export default SearchForm
