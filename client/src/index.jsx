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

  componentWillMount () {
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
    // TODO
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
        <div className="list">
          {this.state.repos.map((git) => <div>Owner: {git.owner} Repo: {git.repoName}</div>)}
        </div>
    </div>)
  }
  
}

ReactDOM.render(<App />, document.getElementById('app'));