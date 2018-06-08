import { observable } from 'mobx';
import _ from 'lodash';

class ToDoListStore {
  @observable tasks = [];
  @observable tasktab = 'mytasks';

  switchTaskTab = (tasktab) => {
    this.tasktab = tasktab;
  }
  addTask = (task) => {
    this.tasks = [
      ...this.tasks,
      task
    ]
    this.sortingTask();
  }
  editTask = (editTask) => {
    this.tasks.map((task, index) => {
      if (editTask.uuid === task.uuid) {
        task.title = editTask.title,
        task.deadlineDate = editTask.deadlineDate,
        task.deadlineTime = editTask.deadlineTime,
        task.comment = editTask.comment,
        task.complete = editTask.complete,
        task.star = editTask.star,
        task.updateAt = editTask.updateAt
      }
    })
    this.sortingTask();
  }
  changeTaskComplete = (uuid) => {
    this.tasks.filter((task, index) => {
      if (task.uuid === uuid) {
        task.complete = !task.complete
      }
    })
    this.sortingTask();
  }
  changeTaskStar = (uuid) => {
    this.tasks.filter((task, index) => {
      if (task.uuid === uuid) {
        task.star = !task.star
      }
    })
    this.sortingTask();
  }
  sortingTask = () => {
    this.tasks = _.orderBy(this.tasks, ['complete', 'star', 'updateAt'], ['asc', 'desc', 'desc']);
  }
}

const store = new ToDoListStore();
export default store;
