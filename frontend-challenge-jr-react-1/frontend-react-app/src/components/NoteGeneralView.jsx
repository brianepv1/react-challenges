import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const NoteGeneralView = ({id, title, date, archived, content}) => {
	return (
		<Form>
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label>Title address</Form.Label>
				<Form.Control value={title} type="email" placeholder="name@example.com" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				<Form.Label>Content textarea</Form.Label>
				<Form.Control value={content} as="textarea" rows={3} />
			</Form.Group>
		</Form>
	);
}

NoteGeneralView.prototype = {
	modalTitlte: PropTypes.string,
}


export default NoteGeneralView;
