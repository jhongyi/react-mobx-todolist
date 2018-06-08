import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { observer } from 'mobx-react';
import { InputGroup, Input } from 'reactstrap';

import EditorTask from './EditorTask';
import TaskList from './TaskList';
import ToDoListStore from './ToDoListStore';

const Div = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Header = styled.div`
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
    background: #00408B;
    border: none;
    transition: .3s ease-in-out;
  }
`;

const Content = styled.div`
  background: #E1E1E1;
  width: 60rem;
  min-width: 40rem;
  max-width: 80rem;
  height: calc(100vh - 81px);
  text-align: center;
`;

const EditorDiv = styled.div`
  margin-top: 1rem;

  .input {
    margin: 0 auto;
    margin-top: 1rem;
    width: 30rem;
    height: 2rem;
  }
`;

@observer
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTask: false,
      showEditTask: false
    }
  }

  handleShowAddTask = () => {
    this.setState({
      ...this.state,
      showAddTask: !this.state.showAddTask
    })
  }
  handleShowEditTask = () => {
    this.setState({
      ...this.state,
      showEditTask: !this.state.showEditTask
    })
  }

  render() {
    return (
      <Div>
        <Header>
          <div>
            <ul>
              <li className="tasks"><a href="#/ToDoList">MyTasks</a></li>
              <li className="progressd"><a href="#/ToDoList">In Progress</a></li>
              <li className="completed"><a href="#/ToDoList">Completed</a></li>
              <hr />
            </ul>
          </div>
        </Header>
        <Content>
          <EditorDiv>
            {
              !this.state.showAddTask ?
                <InputGroup className="input">
                  <Input placeholder="+ Add Task" onClick={this.handleShowAddTask} />
                </InputGroup>
                :
                <EditorTask store={ToDoListStore} type="add" showEditorTask={this.state.showAddTask} handleShowAddTask={this.handleShowAddTask} />
            }
          </EditorDiv>
          <br />
          <TaskList store={ToDoListStore} type="edit" showEditorTask={this.state.showEditTask} handleShowEditTask={this.handleShowEditTask} />
        </Content>
      </Div>
    );
  }
}
