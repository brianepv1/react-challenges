
import { useState, useDefect } from 'react';
import { API } from './api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ModalDialog from './components/ModalDialog';
import NoteComponent from './components/NoteComponent';
import { useEffect } from 'react';


function App() {
	//State to control the render from the API
	const [notesState, setNotesState] = useState( () => API.notes.list());
	const [showModal, setShowModal] = useState(false);
	const [draftNote, setDraftNote] = useState([]);
	const [formIdValueForm , setFormIdValueForm] = useState("");
	const [formTitleValueForm, setFormTitleValueForm ] = useState("");
	const [formContentValueForm, setFormContentValueForm] = useState("");
	
	const handleArchiveButton = (id) => {
		/**
		 * @Parameters {id: id of the dataset}, {notesStates: actual state from the application}
		 * @Description 
		 * Everytime that we click on the Archived button, this call a setNotesStates to
		 * change the state of the application and archived value will change too.
		 * In other words, when you click Archived button, the archived value could change in true or false.
		 */
		setNotesState( (notesState) =>
			notesState.map((note) => {
				//If note.id is not equal to the parameter id, return the same exact note
				if(note.id != id) return note;
				//But if is the same id, we return the same note with "...note" but archived change to {false} value or {true} value
				return {
					...note,
					archived: !note.archived,
				};
			}),
		);
	}

	const handleDeleteButton = (id) => {
		setNotesState((notesState) => notesState.filter( (note) => note.id != id))
	}

	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	/**
	 * 
	 * @param {string} id 
	 * @returns the value if exist in the noteState
	 */
	const findNoteById = (id) => {
		//Obtenemos el valor desde el componente, y lo buscamos en nuetro array,
		//Si existe con la funcion find, nos devolvera ese valor
		return notesState.find( (element) => {
			return element.id == id
		})
	}

	const handleEdit = (id) => {
		handleShowModal();
		console.log(findNoteById(id).content);
		let idNote = findNoteById(id).id;
		let titleNote = findNoteById(id).title;
		let contentNote = findNoteById(id).content;
		setFormIdValueForm(idNote);
		setFormTitleValueForm(titleNote);
		setFormContentValueForm(contentNote);
	}

	const handleNoteChange = (formInputChanged, valueInputChanged) =>{
		setDraftNote(() => ({
			...draft,
			[field]: valueInputChanged,
		}))
	}
	
	return (
		<main>
			<h2>Notes App</h2>
			<Button onClick={handleShowModal} variant="primary">Create note</Button>
			<div className='mainContainer'>
					{notesState.map( noteItem => {
						return <NoteComponent 
							onArchive={handleArchiveButton}
							onDelete={handleDeleteButton}
							onEdit={handleEdit}
							onChange={handleNoteChange}
							key={noteItem.id}
							id={noteItem.id}
							title={noteItem.title}
							content={noteItem.content}
							date={noteItem.lastEdited}
							archived={noteItem.archived}
						/>;
					})}
			</div>

			<ModalDialog 
				show={showModal}
				onClose={handleCloseModal}
				id={formIdValueForm}
				title={formTitleValueForm}
				content={formContentValueForm}

			/>

		</main>
	)
}


export default App;