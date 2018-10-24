import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

async function getTypes() {
    try {
        let response = await fetch('/api/types');

        let types = await response.json();
        
        console.log(types.length)

        ReactDOM.render(<App types={types} />, document.getElementById('root'));

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: http://bit.ly/CRA-PWA
        serviceWorker.unregister();

    }
    catch (e) {
        console.error(e.message)
    }
}

getTypes();


