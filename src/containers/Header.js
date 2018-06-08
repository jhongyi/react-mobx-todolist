import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const caculateHrMargin = (tasktab) => {
  if (tasktab === 'mytasks') {
    return '0';
  } else if (tasktab === 'inprogress') {
    return 'calc(100% / 3)';
  } else {
    return 'calc(100% / 3 * 2)';
  }
}

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #4A90E2;
  height: 3rem;
  width: 60rem;
  min-width: 40rem;
  max-width: 80rem;
  div {
    width: 100%;
    padding 0;
    text-align: center;
  }
  ul {
    margin: 0 auto;
    padding: 0;
  }
  ul li {
    display: inline;
    text-align: center;
  }

  a {
    display: inline-block;
    width: 30%;
    padding: .75rem 0;
    margin: 0;
    text-decoration: none;
    color: #333;
    &:hover {
      color: #fff;
    }
  }

  .tasks:hover ~ hr {
    margin-left: 0;
  }

  .progressd:hover ~ hr {
    margin-left: calc(100% / 3);
  }

  .completed:hover ~ hr {
    margin-left: calc(100% / 3 * 2);
  }

  hr {
    height: .35rem;
    width: calc(100% / 3);
    margin: 0;
    margin-left: ${props => caculateHrMargin(props.tasktab)};
    background: #00408B;
    border: none;
    transition: .3s ease-in-out;
  }
`;

@observer
class Header extends Component {
  switchTaskTab = (tasktab) => {
    this.props.store.switchTaskTab(tasktab);
  }

  render() {
    const { tasktab } = this.props.store;
    return (
      <HeaderDiv tasktab={tasktab}>
        <div>
          <ul>
            <li className="tasks" onClick={() => this.switchTaskTab('mytasks')}><a href="#/ToDoList">MyTasks</a></li>
            <li className="progressd" onClick={() => this.switchTaskTab('inprogress')}><a href="#/ToDoList">In Progress</a></li>
            <li className="completed" onClick={() => this.switchTaskTab('completed')}><a href="#/ToDoList">Completed</a></li>
            <hr />
          </ul>
        </div>
      </HeaderDiv>
    );
  }
}

export default Header;
