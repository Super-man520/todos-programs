Vue.component('todofooter', {
  template: `
  <footer class="footer" v-show="showFooter">
  <span class="todo-count"><strong>{{leftTodo}}</strong> item left</span>
  <ul class="filters">
    <li>
      <a :class="{selected:current=='All'}" href="#/" @click="display('All')">All</a>
    </li>
    <li>
      <a href="#/active" :class="{selected:current=='Active'}" @click="display('Active')">Active</a>
    </li>
    <li>
      <a href="#/completed" :class="{selected:current=='Completed'}" @click="display('Completed')">Completed</a>
    </li>
  </ul>
  <button class="clear-completed" @click="clearCompleted" v-show="showClear">Clear completed</button>
  </footer>
  `,
  props: ['list'],
  data() {
    return {
      current: 'All'
    }
  },
  methods: {
    display(type) {
      this.current = type
      this.$emit('show-list', type)
    },
    clearCompleted() {
      this.$emit('clear-completed')
    }
  },
  computed: {
    leftTodo() {
      return this.list.filter(item => !item.flag).length
    },
    showFooter() {
      return this.list.length > 0
    },
    showClear() {
      return this.list.some(item => item.flag)
    }
  }
})