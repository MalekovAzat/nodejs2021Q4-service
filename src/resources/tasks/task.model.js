const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title,
    order,
    description,
    userId = null,
    boardId,
    columnId,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  update(properties) {
    Object.entries(properties).forEach(([name, value]) => {
      if (
        [
          'title',
          'order',
          'description',
          'userId',
          'boardId',
          'columnId',
        ].indexOf(name) >= 0 &&
        value !== undefined
      ) {
        this[name] = value;
      }
    });
  }
}

module.exports = Task;
