Vue.component('todoheader', {
  template: `
  <header class="header">
  <h1>todos</h1>
  <input class="new-todo" placeholder="What needs to be done?" autofocus v-model.trim="newText" @keyup.enter="addTodo">
   </header>
  `,
  props: ['list'],
  data() {
    return {
      newText: ''
    }
  },
  methods: {
    addTodo() {
      if (this.newText == '') return
      let $add = this.list.some(item => item.text == this.newText)
      if ($add) {
        return
      } else {
        this.$emit('add-todo', this.newText)
        this.newText = ''
      }
    }
  }
})