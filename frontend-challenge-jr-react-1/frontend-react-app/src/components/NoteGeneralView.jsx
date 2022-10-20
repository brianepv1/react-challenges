import PropTypes from 'prop-types';
import ModalDialog from "react-bootstrap/esm/ModalDialog";

const NoteGeneralView = ({modalTitlte}) => {
	return (
		<h2> Hola </h2>
	);
}

NoteGeneralView.prototype = {
	modalTitlte: PropTypes.string,
}


export default NoteGeneralView;
