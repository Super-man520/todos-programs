Vue.component('todomain', {
  template: `
  <section class="main">
  <input id="toggle-all" class="toggle-all" type="checkbox" v-model="totalAll">
  <label for="toggle-all">Mark all as complete</label>
  <ul class="todo-list">
    <li :class="{completed:item.flag,editing:item.id==now}" v-for="(item,index) in newlist" :key="item.id">
      <div class="view">
        <input class="toggle" type="checkbox" v-model="item.flag">
        <label @dblclick="showEdit(item.id)">{{item.text}}</label>
        <button class="destroy" @click="delTodo(item.id)"></button>
      </div>
      <input class="edit" v-model="item.text" @keyup.enter="editTodo(item.id)">
    </li>
  </ul>
  </section>
  `,
  props: ['list','newlist'],
  data() {
    return {
      now: -1
    }
  },
  methods: {
    showEdit(id) {
      this.now = id
    },
    editTodo(id) {
      this.now = -1
    },
    delTodo(id) {
      this.$emit('del-todo', id)
    }
  },
  computed: {
    totalAll: {
      get() {
        return this.list.every(item => item.flag)
      },
      set(value) {
        this.list.forEach(item => item.flag = value)
      }
    }
  }
})