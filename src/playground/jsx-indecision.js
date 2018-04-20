const appRoot = document.getElementById('root');

const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of a computer',
    options: []
}

const onFormSubmit = (e) => {
   e.preventDefault();
   const option = e.target.elements.option.value;
   if(option){
       app.options.push(option);
       e.target.elements.option.value = '';
       render();
   }
}

const getRandomOption = () => {
    const randomNum = Math.floor(Math.random()*app.options.length);
    alert(app.options[randomNum]);
}

const onRemoveAll = () => {
    app.options = [];
    render();
}

const render = () => {
    const template = (
        <div>
          <h1>{app.title}</h1>
          <p>{app.subtitle}</p>
          <div>
            <p>{app.options.length > 0 ? "here are your options:":"no options"}</p>
            <button disabled = {app.options.length === 0} onClick={getRandomOption}>
            What should I do?
            </button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
            {(app.options.length > 0) && app.options.map((option, index) => { 
               return <li key={index}>{option}</li> })}
            </ol>
          </div>
          <form onSubmit={onFormSubmit}>
             <input type='text' name='option'/>
             <button>Add option</button>
          </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
}

render();
