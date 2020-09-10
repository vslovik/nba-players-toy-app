import React from 'react'
import Highlight from './Highlight'
import {Card, CardText} from './PlayerListItem.style';

type Props = PlayerDataBlockProps

const Data: React.FC<Props> = ({data, onClick, highlight}) => {
  if (data.first_name === '')
      return (<div/>);
  return (
    <Card>
      <CardText>
          <a onClick={onClick}>
              <Highlight highlight={highlight}>{data.first_name}</Highlight>&nbsp;
              <Highlight highlight={highlight}>{data.last_name}</Highlight>
          </a>&nbsp;
          <a onClick={onClick}>(more...)</a>
      </CardText>
    </Card>
  )
};

export default Data
