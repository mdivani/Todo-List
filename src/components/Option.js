import React from 'react';

const Option = (props) => {
    const options = props.options;
    return (
        <div>
        {options.length === 0 && (<p className='widget__message'>Please add an option to get started</p>)}
        {options.map((option, index) => {
            return (
            <div
             className='option'
             key={index}>
                <p className='option__text'> {index + 1}. {option} </p>
                <button 
                    className='button button--link' 
                    onClick={(e) => {props.handleDeleteOption(option)}}
                >
                    Remove
                </button>
            </div>
        );
        })}
        </div>
    );
}

export default Option;