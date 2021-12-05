const { v4: uuidv4 } = require('uuid');

class Board {
  constructor({ id = uuidv4(), title = 'Title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  update(properties) {
    Object.entries(properties).forEach(([name, value]) => {
      if (['title', 'columns'].indexOf(name) >= 0 && value !== undefined) {
        this[name] = value;
      }
    });
  }
}

module.exports = Board;
