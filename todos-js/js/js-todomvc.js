
// 定义一个空数组存放数据
var todoList = []
// 获取输入框
var toggleAll = document.querySelector('#toggle-all')
// 清空已完成
var clearCompleted = document.querySelector('.footer .clear-completed')
// 获取ul标签存储
var todoDom = document.querySelector('.main .todo-list')
// 获取底部标签
var footer = document.querySelector('.footer')
// 获取剩余待办项
var leftItem = document.querySelector('.todo-count strong')

// var newList = []

var h1 = document.querySelector('.h1')
h1.style.display = 'none'
h1.style.color = '#e92322'

// 每次todoList更新 都需要更新数据库localstorage
function updateTodo() {
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

// 获取数据库localstorage中的数据，渲染到页面todoDom
function renderTodo() {
    todoList = JSON.parse(localStorage.getItem('todoList') || '[]')

    // 判断当前待办事项的长度 ，如果为空  则不显示 footer
    if (todoList.length == 0) {
        footer.style.display = 'none'
    } else {
        footer.style.display = 'block'
    }

    //如果todoList中所有的待办项都是完成状态，那么全选按钮高亮显示
    var allStatus = todoList.every((ele, idx) => ele.flag)
    toggleAll.checked = allStatus

    // 根据待办事项完成状态  统计footer中未完成的待办项
    var count = 0
    todoList.forEach(element => {
        if (!element.flag) {
            count++
        }
    });
    // 如果count等于数据长度 说明都没有完成  清空已完成事项隐藏
    if (count == todoList.length) {
        clearCompleted.style.display = 'none'
    } else {
        clearCompleted.style.display = 'block'
    }
    // 渲染到页面
    leftItem.innerHTML = count

    // 模板
    var tempStr = template('tmp', { list: todoList })
    todoDom.innerHTML = tempStr
}
renderTodo()

// 添加待办项
var newTodo = document.querySelector('.new-todo')
newTodo.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        // 判断输入内容是否为空
        if (newTodo.value.trim() == '') {
            return
        }
        // 判断数组里面是否已经存在该项
        $todoList = todoList.some(item => item.title == newTodo.value)
        if ($todoList) {
            h1.style.display = 'block'
            return
        } else {
            h1.style.display = 'none'
            // 依次添加到todoList
            todoList.push({
                id: +new Date(),
                text: newTodo.value,
                flag: false
            })
            // 清空输入框
            newTodo.value = ''
        }
        updateTodo()
        renderTodo()
    }
})

// 双击待办项  进入编辑状态
var main = document.querySelector('.main')
main.addEventListener('dblclick', function (e) {

    if (e.target.tagName == "LABEL") {
        // console.log(e.target.parentNode.parentNode);

        e.target.parentNode.parentNode.classList.toggle('editing')
        // 获取当前的id赋值给id
        // id = e.target.dataset.id
        // console.log(id);        
        // renderTodo()
    }
})

// 更新编辑中的待办项
main.addEventListener('change', function (e) {

    if (e.target.className == 'edit' || e.keyCode == 13) {
        // console.log(e.target.previousElementSibling.children[0]);
        // e.target.previousElementSibling.children[0].removeAttribute('checked')
        // 获取当前的id
        var editId = e.target.dataset.id
        todoList.forEach((ele, idx) => {
            if (ele.id == editId) {
                ele.flag = false
                // 更新当前待办项的title
                ele.title = e.target.value
            }
        })
    }
    updateTodo()
    renderTodo()
})


// 点击待办项中checkbox，更新当前待办项的完成状态
main.addEventListener('click', function (e) {
    // console.log(e); 
    // 获取当前的元素的id
    var id = e.target.parentNode.parentNode.dataset.id

    if (e.target.className == "toggle") {
        // console.log(e.target);
        todoList.forEach(function (ele, idx) {
            if (ele.id == id) {
                ele.flag = e.target.checked
                updateTodo()
                renderTodo()
            }
        })
    }

    // 点击destroy删除当前行
    if (e.target.className == 'destroy') {
        todoList.forEach((ele, idx) => {
            if (ele.id == id) {
                todoList.splice(idx, 1)
                updateTodo()
                renderTodo()
            }
        })
    }
})

// 点击全选按钮  当前列表项都变成已完成状态
toggleAll.addEventListener('click', function () {
    var status = this.checked
    todoList.forEach((ele, idx) => {
        ele.flag = status
    })
    updateTodo()
    renderTodo()
})

// 点击clearCompleted按钮 清除当前已完成的项目
clearCompleted.addEventListener('click', function () {
    todoList = todoList.filter(item => !item.flag)
    updateTodo()
    renderTodo()
})


// 获取所有的filters a元素
var links = document.querySelectorAll('.filters li a')
for (var i = 0; i < links.length; i++) {
    links[i].index = i
    links[i].onclick = function () {
        // 存取下标
        for (var i = 0; i < links.length; i++) {
            // 排除法
            links[i].removeAttribute('class')
            // 复活自己
            this.setAttribute('class', 'selected')
        }
    }
}

// 所有的
links[0].addEventListener('click', function () {
    var list = todoList
    // updateTodo()
    // renderTodo()
    var tempStr = template('tmp', { list: list })
    todoDom.innerHTML = tempStr
})

// 未完成的
links[1].addEventListener('click', function () {
    var list = todoList.filter(item => item.flag)
    // updateTodo()
    // renderTodo()
    var tempStr = template('tmp', { list: list })
    todoDom.innerHTML = tempStr
})

// 已完成的
links[2].addEventListener('click', function () {
    var list = todoList.filter(item => !item.flag)
    // updateTodo()
    // renderTodo()
    var tempStr = template('tmp', { list: list })
    todoDom.innerHTML = tempStr
})
