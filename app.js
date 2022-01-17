var app = new Vue({
  el: '#app',
  data() {
    return {
      tasks: [
        { id:1, name: 'Todo 1', description: 'This is a todo', completed: false },
        { id:2, name: 'Todo 2', description: 'This is another todo', completed: false },
        { id:3, name: 'Todo Three', description: 'This is complete todo', completed: true },
        { id:4, name: 'Four', description: 'This is another complete todo', completed: true },
      ],
      message: 'Hello World!'
    }
  },
  computed: {
    completedTasks() {
      return this.tasks.filter( item => item.completed == true );
    },
    todoTasks() {
      return this.tasks.filter( item => item.completed == false );
    }
  }
})