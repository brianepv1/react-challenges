import PropTypes from 'prop-types';
import { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NoteGeneralView from "./NoteGeneralView"

//Modal Dialog component get show prop an this define if the modal is showing or no with true or false
//Also moda receive a onHide with handleCloseModal function to change the state and close the modal
const ModalMessage = ({message, titleItem}) => {
	return <>
		<p>{message}</p>
		<p>
			<strong style={{color: 'red'}}>{titleItem} </strong>
			will be deleted forever.
		</p>
		
		
	</>;
}

const ModalDialog = ({id, title, date, archived, content, messageBody, show, titleNote, onClose, onSave, onEdit, onDelete, deleteFlag}) => {
	const [valueTitleInput, setValueTitleInput] = useState("");
	const [valueContentInput, setValueContentInput] = useState("");




	const handleTitleInput = (e) => {
		setValueTitleInput(e.target.value);
		console.log('title is:', e.target.value);
    	return valueTitleInput;
	}

	const handleContentInput = (e) => {
		isEdit();
		setValueContentInput(e.target.value);
    	console.log('content is:', e.target.value);
		return valueContentInput;
	}
	
	return(
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body> 
				{(messageBody != undefined)
					? <ModalMessage message={messageBody} titleItem={titleNote}/>
					: <Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Title address</Form.Label>
							<Form.Control value={valueTitleInput} onChange={handleTitleInput} type="email" placeholder="name@example.com" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Content textarea</Form.Label>
							<Form.Control value={valueContentInput} onChange={handleContentInput} as="textarea" rows={3} />
						</Form.Group>
					</Form>
						
					
				} 
			</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onClose}>
						Close
					</Button>
					{(id == "" && !deleteFlag) && <Button onClick={() => onSave(id, valueTitleInput, valueContentInput)} variant="primary">
						Save Changes
					</Button>}
					{(deleteFlag) && <Button onClick={() => onDelete(id)} variant="danger">
						Delete Changes
					</Button>}
					{(id) && <Button onClick={() => onSave(id, valueTitleInput, valueContentInput)} variant="warning">
						Edit Changes
					</Button>}
					
					
					
			</Modal.Footer>
	  </Modal>
	)
}

ModalDialog.prototype = {
	headerTitle: PropTypes.string,
	show: PropTypes.func, 
	onClose: PropTypes.func, 
	titleNote: PropTypes.string, 
}

export default ModalDialog;