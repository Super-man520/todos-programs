// 先进行实例化
const vm = new Vue({
    el: '.todoapp',
    data: {
        list: [],
        // 标记一个变量接收头部输入框的内容
        newText: '',
        now: -1,
        current: 'All'
    },
    // vue中的watch监听功能  监听list的变化  只要list变化了  就自动存储到本地
    watch: {
        list: {
            // 复杂数据类型的监听  数组/对象
            deep: true,
            // newValue  变化的值
            handler(newValue) {
                localStorage.setItem('todoList', JSON.stringify(newValue))
            }
        }
    },
    // 本地存储获取数据
    created() {
        this.list = JSON.parse(localStorage.getItem('todoList')) || []
    },
    methods: {
        addTodo() {
            if (this.newText == '') return
            let obj = {
                id: Date.now(),
                text: this.newText,
                flag: false
            }
            let $todo = this.list.some(item => item.text == this.newText)
            if ($todo) {
                // return
            } else {
                this.list = [obj, ...this.list]
                this.newText = ''
                if (this.list.length > 10) {
                    this.list.pop()
                }
            }
        },
        delTodo(id) {
            this.list = this.list.filter(item => item.id != id)
        },
        showEdit(id) {
            this.now = id
        },
        editTodo(id) {
            this.now = -1
            let $exit = this.list.find(item => item.id = id)
            $exit.flag = false
        },
        All() {
            this.current = 'All'
        },
        Active() {
            this.current = 'Active'
        },
        Completed() {
            this.current = 'Completed'
        }
    },
    computed: {
        totalAll: {
            get() {
                return this.list.every(item => item.flag)
            },
            set(value) {
                this.list.forEach(item => item.flag = value);
            }
        },
        showFooter() {
            return this.list.length > 0
        },
        clearTodo() {
            return this.list.some(item => !item.flag)
        },
        leftTodo() {
            return this.list.filter(item => !item.flag).length
        },
        newList() {
            if (this.current == 'All') {
                return this.list
            } else if (this.current == 'Active') {
                return this.list.filter(item => !item.flag)
            } else if (this.current == 'Completed') {
                return this.list.filter(item => item.flag)
            }
        }
    }
})