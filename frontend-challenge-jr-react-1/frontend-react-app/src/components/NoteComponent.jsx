import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ModalDialog from './ModalDialog';

const NoteComponent = ({id, title, date, archived, content, onArchive, onDeleteConfirmation}) =>{
	//State for modal dialog, default state in false
	const [showModal, setShowModal] = useState(false);
	//State to receive the confirmation of the modal
	const [confirmationDelete, setconfirmationDelete] = useState(false);
	const [nameModal, setNameModal] = useState("");
	const [haveTextBody, setNahaveTextBodymeModal] = useState("");

	const handleShowModal = (headerTitle, messageBody) => {
		setNameModal(headerTitle);
		setShowModal(true);
		console.log(messageBody)
		if(messageBody != ""){
			setNahaveTextBodymeModal(messageBody);
		}

	};

	const handleCloseModal = () => setShowModal(false);

	//useEffect can work as a trigger so if the confirmationDelete change, 
	//this will update the view and delete the note
	useEffect(() => {
		//If confirmationDelete change to true, this mean that te confirmatoin was done.
		//So if that happen, we use the handleDeleteButton function to update the view
		(confirmationDelete == true) && onDeleteConfirmation(id)
	}, [confirmationDelete]);


	const handleConfirmationDelete = () => {
		setconfirmationDelete(true);
		setShowModal(false)
	};
	
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
							<Button onClick={() => handleShowModal("Edit Note")} variant="warning">Edit</Button>
						</Col>
						<Col>
							<Button onClick={() => handleShowModal(
								"Delete Confirmation", 
								`Do you really want to delete this note?`)
							} variant="danger">Delete</Button>
						</Col>
					</Row>
				</Container>
			</Card>

			<ModalDialog headerTitle={nameModal} messageBody={haveTextBody} show={showModal} onCloseModal={handleCloseModal} onConfirmationDelete={handleConfirmationDelete} titleNote={title}/>
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