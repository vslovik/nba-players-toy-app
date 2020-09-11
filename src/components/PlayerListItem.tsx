import React from 'react'
import Highlight from './Highlight'
import {Card, CardText} from './PlayerListItem.style';

type Props = PlayerDataBlockProps

const Data: React.FC<Props> = ({data, onClick, highlight}) => {
  if (data.first_name === '')
      return (<div/>);
  const name = data.first_name + ' ' + data.last_name;
  return (
    <Card>
      <CardText onClick={onClick}>
          <Highlight highlight={highlight}>{name}</Highlight>
      </CardText>&nbsp;<CardText onClick={onClick}>(more...)</CardText>
    </Card>
  )
};

export default Data
