import { observable, action } from 'mobx';

class AppStore {
  @observable
  list = [];

  @observable
  timer = 0;

  @action.bound
  setList(data) {
    this.list = data;
  }

  @action.bound
  resetTimer() {
    this.timer = 0;
  }

  @action.bound
  tick() {
    this.timer += 1;
  }
}

const appStore = new AppStore();
export { appStore };
