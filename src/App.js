import React, { Component } from 'react';
import SensorTypeList from './SensorTypeList.js';
import Content from './Content.js'
import './App.css';
import './header.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.updateContent= this.updateContent.bind(this)
    this.state = {
      contentUri: ""
    }
  }

  updateContent(uri) {
    this.setState({ 
      contentUri: uri 
      })
  }

  render() {
    return (
      <div className="App">
        <header className="_header" role="banner">
          <button type="button" aria-label="Toggle navigation" className="_header-btn" data-toggle-sidebar="">
            <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
          </button>
          <form className="_search" role="search">
            <svg><use xlink="#icon-search"></use></svg>
            <input type="search" name="q" className="_search-input" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" maxLength="30" aria-label="Search" placeholder="Search..." styles={{ paddingLeft: '48px' }}/>
            <button type="reset" className="_search-clear" title="Clear search"><svg><use xlink="#icon-close"></use></svg>Clear search</button>
            <div className="_search-tag" styles={{ display: 'none' }}></div>
          </form>
        </header>
        <section className="_sidebar" tabIndex="-1">
          <SensorTypeList updateContentUri={this.updateContent}></SensorTypeList>
        </section>
        <div className="_container" role="document">
          <main className="_content _content_loading" role="main">
            <Content uri={this.state.contentUri}></Content>
          </main>
        </div>
        <svg styles={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg" >
          <defs>
            <symbol id="icon-search" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></symbol>
            <symbol id="icon-dir" viewBox="0 0 20 20"><path d="M15 10c0 .3-.305.515-.305.515l-8.56 5.303c-.625.41-1.135.106-1.135-.67V4.853c0-.777.51-1.078 1.135-.67l8.56 5.305S15 9.702 15 10z"></path></symbol>
            <symbol id="icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></symbol>
            <symbol id="icon-copy" viewBox="0 0 14 16"><path d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></symbol>
            <symbol id="icon-external-link" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></symbol>
          </defs>
        </svg>
      </div>
    );
  }
}

export default App;
