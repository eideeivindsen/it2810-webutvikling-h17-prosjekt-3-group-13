class Todo {
    constructor(title, completed) {
        this.title = title;
        this.completed = completed || false;
        this.createdAt = new Date();
    }
}

module.exports = Todo;


module.exports = {
    move: function(array, fromIndex, toIndex) {
        return array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
    },

    findTodo: function(todo, todoList) {
        return todoList.find((item) => item.title.toLowerCase() === todo.title.toLowerCase());
    }
};