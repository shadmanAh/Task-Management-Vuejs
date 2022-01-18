var app = new Vue({
  el: '#app',
  components: {
    'task': {
      props: ['task'],
      template: `
              <div class="ui segment task" 
                v-bind:class="task.completed ? 'done' : 'todo' ">
                  <div class="ui grid">
                    <div class="left floated twelve wide column">
                      <div class="ui checkbox">
                        <input type="checkbox" name="task" @click="$parent.toggleDone($event, task.id)" :checked="task.completed" >
                        <label>{{ task.name }} <span class="description">{{ task.description }}</span></label>
                      </div>
                    </div>
                    <div class="right floated three wide column">
                      <i class="icon pencil blue" alt="Edit" @click="$parent.editTask($event, task.id)"></i>
                      <i class="icon trash red" alt="Delete" @click="$parent.deleteTask($event, task.id)"></i>
                    </div>
                  </div>
              </div>
              `,
    },
  },
  data: {
    tasks: [
      { id:1, name: 'Todo 1', description: 'This is a todo', completed: false },
      { id:2, name: 'Todo 2', description: 'This is another todo', completed: true },
      { id:3, name: 'Todo Three', description: 'This is complete todo', completed: true },
      { id:4, name: 'Four', description: 'This is another complete todo', completed: true },
    ],
    task: {},
    message: '',
    action: 'create',
  },
  computed: {
    completedTasks() {
      return this.tasks.filter( item => item.completed == true );
    },
    todoTasks() {
      return this.tasks.filter( item => item.completed == false );
    },
    nextId() {
      return (this.tasks.sort(function(a,b){ return a.id - b.id; }))[this.tasks.length - 1].id + 1;
    },
  },
  methods: {
    clear() {
      this.task = {};
      this.action = 'create';
      this.message = '';
    },
    toggleDone(event, id) {
      let task = this.tasks.find(item => item.id == id);
      if(task) {
        task.completed = !task.completed;
        this.message = `Task ${id} updated.`;
      }
    },
    createTask(event) {
      if(!this.task.completed) {
        this.task.completed = false;
      } else {
        this.task.completed = true;
      }

      let taskId = this.nextId;

      this.task.id = taskId;
      this.tasks.push(this.task);
      this.clear();
      this.message = `Task ${taskId} created.`;
    },
    editTask(event, id) {
      this.action = 'edit';
      let task = this.tasks.find(item => item.id == id);
      if(task) {
        this.task = { id: id, 
                      name: task.name, 
                      description: task.description, 
                      completed: task.completed };
      }
    },
    updateTask(event, id) {
      event.stopImmediatePropagation();
      let task = this.tasks.find(item => item.id ==id);
      if(task) {
        task.name = this.task.name;
        task.description = this.task.description;
        task.completed = this.task.completed;
        this.message = `Task ${id} updated.`;
      }
    },
    deleteTask(event, id) {
      event.stopImmediatePropagation();
      let taskIndex = this.tasks.findIndex(item => item.id == id);
      if(taskIndex > -1) {
        this.$delete(this.tasks, taskIndex);
        this.message = `Task ${id} deleted.`;
      }
    }
  },
})