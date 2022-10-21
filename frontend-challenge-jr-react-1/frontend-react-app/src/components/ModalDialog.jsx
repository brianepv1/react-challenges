import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NoteGeneralView from './NoteGeneralView';

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
const ModalDialog = ({id, title, date, archived, content,messageBody, show, titleNote, onClose}) => {
	return(
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body> 
				{(messageBody != undefined)
					? <ModalMessage message={messageBody} titleItem={titleNote}/>
					: <NoteGeneralView />
				} 
			</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={onClose}>
						Close
					</Button>
					<Button variant="primary">
						Save Changes
					</Button>
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