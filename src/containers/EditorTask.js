import React, { Component } from 'react';
import styled from 'styled-components';
import { InputGroup, Input, FormGroup } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import ContentEditable from 'react-contenteditable';
import moment from 'moment';
import uuid from 'uuid/v4';

const EditorDiv = styled.div`
  margin-top: 1rem;

  .editor-content {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 50%;
    height: 25rem;
    background: #F2F2F2;

    hr {
      border: 1px solid #C8C8C8;
      margin-top: 0;
      width: 100%;
    }
    .editor-task {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4rem;
      background: ${props => props.star ? '#FFF2DC' : '#F2F2F2'};

      .editor-task-title {
        width: 70%;
        float: left;
        text-align: left;
        .form-check {
          padding-left: 0;
        }
        div {
          margin-left: 2.5rem;
        }
      }
      .hr {
        border: 1px solid #E2E2E2;
        width: 100%;
      }
      .editor-task-icon {
        width: 30%;
        color: transparent;
        float: right;
        font-size: 16pt;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: #000;
        cursor: pointer;
        span {
          padding-left: 2rem;
        }
      }
    }
    .task-content {
      margin: 0 auto;
      .content-table {
        .datetime-group {
          display: -webkit-box;
          width: 12rem;
          input {
            border: none;
            margin-right: 0.3rem;
          }
        }
        .table-title-tr {
          text-align: left;
        }
        .table-content-td {
          padding-left: 1.5rem;
        }
        textarea {
          height: 7rem;
          width: 25rem;
          border: none;
          resize: none;
        }
      }
      .task-content-icon{
        text-align: left;
        color: transparent;
        font-size: 12pt;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: #000;
      }
    }
    .editor-task-btn {
      display: flex;
      flex-direction: row;
      width: 100%;
      background: #fff;
      align-items: center;
      height: 2.5rem;
      margin-top: 3.2rem;
      cursor: pointer;
      div {
        width: 50%;
      }

      .func-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.5rem;

      }
      .func-btn.cancel {
        color: red;
      }
      .func-btn.add {
        color: #4A90E2;
      }
      .func-btn.cancel, .func-btn.add {
        &:hover {
          width: 50%;
          color: #fff;
          background: #4A90E2;
        }
      }
    }
  }
`;

class EditorTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.type === 'edit' ? props.task.title : 'Type Something Here...',
      deadlineDate: props.type === 'edit' ? props.task.deadlineDate : moment().format('YYYY-MM-DD'),
      deadlineTime: props.type === 'edit' ? props.task.deadlineTime : moment().format('HH:MM'),
      comment: props.type === 'edit' ? props.task.comment : '',
      star: props.type === 'edit' ? props.task.star : false,
      complete: props.type === 'edit' ? props.task.complete : false
    }
  }

  handleTaskTitle = (e) => {
    this.setState({
      ...this.state,
      title: e.target.value
    });
  }

  handleDeadLineDate = (e) => {
    this.setState({
      ...this.state,
      deadlineDate: e.target.value
    })
  }

  handleDeadLineTime = (e) => {
    this.setState({
      ...this.state,
      deadlineTime: e.target.value
    })
  }

  handleTaskComment = (e) => {
    this.setState({
      ...this.state,
      comment: e.target.value
    })
  }

  handleStar = () => {
    this.setState({
      ...this.state,
      star: !this.state.star
    })
  }

  handleComplete = () => {
    this.setState({
      ...this.state,
      complete: !this.state.complete
    })
  }

  handleEditorTask = () => {
    if (this.props.type === 'add') {
      this.props.store.addTask({
        uuid: uuid(),
        title: this.state.title,
        deadlineDate: this.state.deadlineDate,
        deadlineTime: this.state.deadlineTime,
        comment: this.state.comment,
        complete: this.state.complete,
        star: this.state.star,
        createAt: moment().format('YYYY-MM-DD hh:mm:ss'),
        updateAt: moment().format('YYYY-MM-DD hh:mm:ss')
      });
    } else {
      this.props.store.editTask({
        uuid: this.props.task.uuid,
        title: this.state.title,
        deadlineDate: this.state.deadlineDate,
        deadlineTime: this.state.deadlineTime,
        comment: this.state.comment,
        complete: this.state.complete,
        star: this.state.star,
        updateAt: moment().format('YYYY-MM-DD hh:mm:ss')
      });
    }
    this.resetTask();
  }
  resetTask = () => {
    this.setState({
      ...this.state,
      title: 'Type Something Here...',
      deadlineDate: moment().format('YYYY-MM-DD'),
      deadlineTime: moment().format('HH:MM'),
      comment: '',
      star: false,
      complete: false
    });
    if (this.props.type === 'add') {
      this.props.handleShowAddTask();
    } else {
      this.props.handleShowEditTask();
    }
  }

  render() {
    const { showEditorTask, handleShowAddTask, handleShowEditTask } = this.props;
    return (
      <EditorDiv star={this.state.star}>
        {
          showEditorTask &&
          <div className="editor-content">
            <div className="editor-task">
              <div className="editor-task-title">
                <FormGroup check>
                  <Input type="checkbox" id="checkbox2" onClick={this.handleComplete} checked={this.state.complete} />{' '}
                </FormGroup>
                <ContentEditable
                  html={this.state.title}
                  disabled={false}
                  onChange={this.handleTaskTitle}
                />
              </div>
              <div className="editor-task-icon">
                <FontAwesome name='star' onClick={this.handleStar} style={this.state.star ? { color: '#F5A623' } : { color: 'transparent' }} />
                <FontAwesome name='pencil' style={showEditorTask && { color: '#4A90E2' }} onClick={() => { this.props.type === 'add' ? handleShowAddTask() : handleShowEditTask() }} />
              </div>
            </div>
            <hr />
            <div className="task-content">
              <table className="content-table">
                <tbody>
                  <tr className="table-title-tr">
                    <td>
                      <FontAwesome name='calendar' className="task-content-icon" />{' '}Deadline
                    </td>
                  </tr>
                  <tr>
                    <td className="table-content-td">
                      <FormGroup className="datetime-group">
                        <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" value={this.state.deadlineDate} onChange={this.handleDeadLineDate} />
                        <Input type="time" name="time" id="exampleTime" placeholder="time placeholder" value={this.state.deadlineTime} onChange={this.handleDeadLineTime} />
                      </FormGroup>
                    </td>
                  </tr>
                  <tr className="table-title-tr">
                    <td>
                      <FontAwesome name='comment' className="task-content-icon" />{' '}Comment
                    </td>
                  </tr>
                  <tr>
                    <td className="table-content-td">
                      <textarea
                        maxLength="256"
                        placeholder='Type your comment here ...'
                        value={this.state.comment}
                        onChange={this.handleTaskComment}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="editor-task-btn">
              <div className="func-btn cancel" onClick={this.resetTask}>
                X Cancel
              </div>
              <div className="func-btn add" onClick={this.handleEditorTask}>
                {this.props.type === 'edit' ? '+ Save' : '+ Add Task'}
              </div>
            </div>
          </div>
        }
      </EditorDiv>
    );
  }
}

export default EditorTask;
