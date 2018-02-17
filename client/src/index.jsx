import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
  }

  componentDidMount () {
    $.get('/repos', function(repo) {
      //
    }).done(repo => { //once complete
      this.setState({
        repos: repo
      });
    });
  }


  search (term) {
  //  console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: term,
      success: (data) => {
        console.log(data, 'has been sent!');
      },
      error: (err) => {
        console.log('failed', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
        <div className="list" onChange={() => this.componentDidMount()}>
          {this.state.repos.map((git) => <div className="list">Owner: {git.owner} <a className='repo' href={git.htmlUrl}>Repo: {git.repoName}</a></div>)}
        </div>
    </div>)
  }

}

ReactDOM.render(<App />, document.getElementById('app'));