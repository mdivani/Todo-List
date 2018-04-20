import React from 'react';
import Option from './Option';

const Options = (props) => {
    return (
        <div>
        <div className='widget-header'>
        <h3 className='widget-header__title'>Your Options</h3>
        <button
            className='button button--link'
            onClick={props.handleDeleteOptions}>
            Removel all
         </button>
         </div>
            <div>
                {
                <Option 
                    options={props.options} 
                    handleDeleteOption={props.handleDeleteOption}
                />
                } 
           </div>
        </div>
    );
}

export default Options;