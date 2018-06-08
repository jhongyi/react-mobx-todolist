import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { observer } from 'mobx-react';
import { InputGroup, Input } from 'reactstrap';

import Header from './Header';
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

const Content = styled.div`
  background: #E1E1E1;
  width: 60rem;
  min-width: 40rem;
  max-width: 80rem;
  height: calc(100vh - 81px);
  text-align: center;
  overflow-y: scroll;
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
        <Header store={ToDoListStore} />
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
