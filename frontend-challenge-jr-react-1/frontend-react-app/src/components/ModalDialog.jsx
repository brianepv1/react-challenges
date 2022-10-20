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
const ModalDialog = ({headerTitle,messageBody, show, onCloseModal, titleNote, onConfirmationDelete}) => {
	return(
		<Modal show={show} onHide={onCloseModal}>
			<Modal.Header closeButton>
				<Modal.Title>{headerTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body> 
				{(messageBody != undefined)
					? <ModalMessage message={messageBody} titleItem={titleNote}/>
					: <NoteGeneralView />
				} 
			</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={onCloseModal}>
						Close
					</Button>
					<Button variant="primary" onClick={onConfirmationDelete}>
						Save Changes
					</Button>
			</Modal.Footer>
	  </Modal>
	)
}

ModalDialog.prototype = {
	headerTitle: PropTypes.string,
	show: PropTypes.func, 
	onCloseModal: PropTypes.func, 
	onConfirmationDelete: PropTypes.func,
	titleNote: PropTypes.string, 
}

export default ModalDialog;