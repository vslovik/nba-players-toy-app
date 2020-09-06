import React, { useState } from 'react'

type Props = { 
  getPlayerResult: (e: React.FormEvent, formData: PlayerData | any) => void
}

const SearchPlayer: React.FC<Props> = ({ getPlayerResult }) => {
  const [formData, setFormData] = useState<PlayerData | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  };

  return (
    <form className='Form' onSubmit={(e) => getPlayerResult(e, formData)}>
        <label htmlFor='name'>Player Name:</label>
        <input onChange={handleForm} type='text' id='name' />
        <button disabled={formData === undefined} >Search</button>
    </form>
  )
};

export default SearchPlayer
