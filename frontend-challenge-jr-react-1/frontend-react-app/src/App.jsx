
import { useState } from 'react';
import { API } from './api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import NoteComponent from './components/NoteComponent';


function App() {
	//State to control the render from the API
	const [notesState, setNotesState] = useState( () => API.notes.list());
	
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

	

	return (
		<main>
			<h2>Notes App</h2>
			<Button variant="primary">Create note</Button>
			<div className='mainContainer'>
					{notesState.map( noteItem => {
						return <NoteComponent 
							onArchive={handleArchiveButton}
							onDeleteConfirmation={handleDeleteButton}
							key={noteItem.id}
							id={noteItem.id}
							title={noteItem.title}
							content={noteItem.content}
							date={noteItem.lastEdited}
							archived={noteItem.archived}
						/>;
					})}
			</div>
		</main>
	)
}


export default App;