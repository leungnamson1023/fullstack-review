import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {console.log(props)}
    There are {props.repos} repos.
  </div>
)

export default RepoList;