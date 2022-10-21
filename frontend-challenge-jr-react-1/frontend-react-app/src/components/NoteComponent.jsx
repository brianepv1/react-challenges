import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ModalDialog from './ModalDialog';

const NoteComponent = ({id, title, date, archived, content, onArchive, onEdit, onDelete}) =>{
	
	
	return (
		<>
			<Card className='my-3 cardItem'>
				<Container className='px-4 py-2'>
					<Row>
						<Card.Body>
							<Card.Title>{title}</Card.Title>
							<Card.Text>
								{content}
							</Card.Text>
							<Card.Text>
								Last Edited: {date}
							</Card.Text>
						</Card.Body>
					</Row>
					<Row>
						<Col>
							<Button onClick={() => onArchive(id)} variant="primary">Archive {String(archived)}</Button>
						</Col>
						<Col>
							<Button onClick={() => onEdit(id)}variant="warning">Edit</Button>
						</Col>
						<Col>
							<Button onClick={ ()=> onDelete(id)} variant="danger">Delete</Button>
						</Col>
					</Row>
				</Container>
			</Card>


		</>
		
	)
}

//Define the propType with packege "prop-type" of react
NoteComponent.prototype = {
	onArchive: PropTypes.func,
	onDeleteConfirmation: PropTypes.func,
	id: PropTypes.string,
	title: PropTypes.string,
	date: PropTypes.string,
	archived: PropTypes.boolean,
	content: PropTypes.string,
}

export default NoteComponent;