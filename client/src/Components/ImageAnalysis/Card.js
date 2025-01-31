import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import './Card.css'

const HomeCard = (props) => {
    const history = useHistory();

    const handleClick = () => {
        if (props.link) {
            history.push(props.link)
        }
    }

    return (
        <div className='card-wrapper'>
            <Card onClick={handleClick} className='card-overall'>
                <Card.Img style={{ height: 145 }} variant="top" src={props.imgSrc} />
                <Card.Body style={{padding:10}}>
                    <Card.Title style={{ height: 10, textAlign:'left' }}>
                        {props.title}
                    </Card.Title>
                    <Card.Text style={{textAlign:'left'}}>
                        {props.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default HomeCard;