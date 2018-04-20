//Indecision App Main class
class IndecisionApp extends React.Component {
    //constructor
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        }
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

    //event handlers
    handleDeleteOptions() {
        this.setState(() => ({options: []}));
    }
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }
    handlePick() {
        const randomNum = Math.floor(Math.random()*this.state.options.length);
        alert(this.state.options[randomNum]);
    }
    handleAddOption(option){
        if(!option){
            return 'please provide valid option';
        }
        else if(this.state.options.indexOf(option) >= 0){
            return 'this option already exists';
        }

        this.setState((prevState) => ({options: prevState.options.concat([option])}));
    }

    render(){
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of the computer';

        return (
        <div>
            <Header title={title} subtitle = {subtitle} />
            <Action
                hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}
             />
            <Options
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
              />
            <AddOption handleAddOption={this.handleAddOption} />
        </div>
        );
    } 
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>  
    ); 
}

const Action = (props) => {
    return (
        <div>
            <button 
                disabled={!props.hasOptions} 
                onClick={props.handlePick}>
                What should I do?
            </button>
        </div>
     );  
}

const Options = (props) => {
    const length = props.options.length;
    return (
        <div>
        <button onClick={props.handleDeleteOptions}>Removel all</button>
        <div>
         Your options go here:
         <label>Count: {length}</label>
         </div>
         {(length > 0) && (
             <Option 
                options={props.options} 
                handleDeleteOption={props.handleDeleteOption}
             />)}
        </div>
    );
}

const Option = (props) => {
    const options = props.options;
    console.log('length', options.length)
    return (
        <div>
        {options.length === 0 && (<p>Please enter option to start</p>)}
        {options.map((option, index) => {
            return (
            <p key={index}>
                {option}
                <button onClick={(e) => {props.handleDeleteOption(option)}}>Remove</button>
            </p>
        );
        })}
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        if(!error) e.target.elements.option.value = '';
        this.setState(() => ({error: error}));
    }

    render(){
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleAddOption}>
              <input type='text' name='option'/>
              <button>Add Option</button>
            </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));