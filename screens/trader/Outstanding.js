import React from 'react';
import { Body, Right, Text, ListItem, Content, List } from 'native-base';

export default class Outstanding extends React.Component {
    render() {
        return (
            <ListItem>
                <Body>
                    <Text>{this.props.data.outstanding.date}</Text>
                </Body>
                <Right>
                    <Text>{this.props.data.outstanding.outstandingData}</Text>
                </Right>
            </ListItem>
        )
    }
}