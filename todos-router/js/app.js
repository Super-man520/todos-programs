// 先进行实例化
const vm = new Vue({
    el: '.todoapp',
    data: {
        list: [],
        // 标记一个变量接收头部输入框的内容
        title: '',
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
        addTodo(value) {
            let obj = {
                id: Date.now(),
                text: value,
                flag: false
            }
            this.list = [obj, ...this.list]
        },
        delTodo(id) {
            this.list = this.list.filter(item => item.id != id)
        },
        showList(type) {
            this.current = type
        },
        clearCompleted() {
            this.list = this.list.filter(item => !item.flag)
        }
    },
    computed: {
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