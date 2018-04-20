import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleClearSelectedOption}
    contentLabel="Select Option"
    closeTimeoutMS={200}
    className='modal'
    >
        <h3 className='modal__title'>Select Option</h3>
        <p className='modal__body'>{props.selectedOption}</p>
        <button className='button' onClick={props.handleClearSelectedOption}>Okay</button>
    </Modal>
);

export default OptionModal;