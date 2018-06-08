import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, FormGroup } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { observer } from 'mobx-react';

import EditorTask from './EditorTask';

const ListDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  .task-stat {
    color: gray;
    font-style: italic;
    text-align: left;
    margin: 0 auto;
    width: 50%;
    margin-top: 0.5rem;
  }
`;


const ListTask = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  margin-bottom: 1rem;
  width: 50%;
  margin: 0 auto;
  margin-top: 1rem;
  cursor: pointer;

  background: ${props => props.star ? '#FFF2DC' : '#F2F2F2'};

  .list-task-title {
    width: 70%;
    float: left;
    text-align: left;
    .form-check {
      padding-left: 2.25rem;
    }
    span {
      text-decoration: ${props => props.complete ? 'line-through' : 'none'}
      color: ${props => props.complete ? 'gray' : 'black'}
      margin-left: 2.5rem;
    }
    div {
      cursor: pointer;
      color: gray;
      font-size: 8pt;
    }
  }

  .list-task-icon {
    width: 30%;
    color: transparent;
    float: right;
    font-size: 16pt;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #000;
    cursor: pointer;
    .star {
      color: ${props => props.star ? '#F5A623' : 'transparent'}
    }
    span {
      padding-left: 2rem;
    }
  }
`;

@observer
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTask: ''
    };
  }

  handleTaskComplete = (uuid) => {
    this.props.store.changeTaskComplete(uuid);
  }

  handleTaskStar = (uuid) => {
    this.props.store.changeTaskStar(uuid);
  }

  getRemainTask = (tasks) => {
    return tasks.filter((task) => task.complete === false).length;
  }

  handleEditTask = (task) => {
    this.setState({
      editTask: task.uuid
    })
  }

  render() {
    const { tasks, tasktab } = this.props.store;
    let filterTasks = tasks;
    switch (tasktab) {
      case 'mytasks': break;
      case 'inprogress':
        filterTasks = filterTasks.filter((task) => !task.complete);
        break;
      case 'completed':
        filterTasks = filterTasks.filter((task) => task.complete);
        break;
      default: break;
    }

    return (
      <ListDiv>
        {
          filterTasks.map((task, index) => {
            return (
              this.props.showEditorTask && this.state.editTask === task.uuid
                ?
                <EditorTask
                  type={this.props.type}
                  store={this.props.store}
                  task={task}
                  showEditorTask={this.props.showEditorTask}
                  handleShowEditTask={this.props.handleShowEditTask}
                />
                :
                <ListTask key={index} complete={task.complete} star={task.star} onDoubleClick={() => { this.props.handleShowEditTask(); this.handleEditTask(task); }}>
                  <div className="list-task-title">
                    <FormGroup check>
                      <Input type="checkbox" id="checkbox2" onChange={() => this.handleTaskComplete(task.uuid)} checked={task.complete} />{' '}
                    </FormGroup>
                    <span>
                      {task.title}
                    </span>
                    <div>
                      <FontAwesome name='calendar' className="task-content-icon" />{' '}
                      {task.deadlineDate}
                      {
                        task.comment &&
                        <FontAwesome name='comment' className="task-content-icon" />
                      }
                    </div>
                  </div>
                  <div className="list-task-icon">
                    <FontAwesome className="star" name='star' onClick={() => this.handleTaskStar(task.uuid)} />
                    <FontAwesome name='pencil' onClick={() => { this.props.handleShowEditTask(); this.handleEditTask(task); }} />
                  </div>
                </ListTask>
            );
          })
        }
        {
          filterTasks.length > 0 &&
          <div className="task-stat">
            {this.getRemainTask(filterTasks)}{' '}tasks left
          </div>
        }
      </ListDiv>
    );
  }
}

export default TaskList;
