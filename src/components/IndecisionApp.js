import React from 'react';
import ReactDOM from 'react-dom';
import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

//Indecision App Main class
export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }

       //event handlers
    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random()*this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({selectedOption: option}));
    };

    handleAddOption = (option) => {
        if(!option){
            return 'please provide valid option';
        }
        else if(this.state.options.indexOf(option) >= 0){
            return 'this option already exists';
        }

        this.setState((prevState) => ({options: prevState.options.concat([option])}));
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({selectedOption: undefined}));
    }

    //Mounts
    componentDidMount(){
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(() => ({options}));
            }

        }catch(e){
            //do nothing
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const options = JSON.stringify(this.state.options);
            localStorage.setItem('options', options);
        }
    }
    componentWillMount(){

    }

    render(){
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of the computer';

        return (
        <div>
            <Header title={title} subtitle = {subtitle} />
            <div className='container'>
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <div className='widget'>
                    <Options
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOption handleAddOption={this.handleAddOption} />         
                </div>   
            </div>
            <OptionModal
                selectedOption = {this.state.selectedOption}
                handleClearSelectedOption = {this.handleClearSelectedOption}
             />
        </div>
        );
    } 
}