import React from 'react'

type Props = PlayerDataBlockProps

const Data: React.FC<Props> = ({data, onClick}) => {
  if (data.first_name === '')
      return (<div/>)
  return (
    <div className='Card'>
      <div className='Card--text'>
          <a onClick={onClick}><b>{data.first_name} {data.last_name}</b></a> <a onClick={onClick}>(more...)</a>
      </div>
    </div>
  )
};

export default Data
