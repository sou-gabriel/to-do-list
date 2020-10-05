const formAddTodo = document.querySelector('.form-add-todo')
const inputFormSearch = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')

const addTodo = inputValue => {
  if (inputValue.length) {
    todosContainer.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
      </li>`  
    event.target.reset()
  }
}

const removeTodo = clickedElement => {
  const trashDataValue = clickedElement.dataset.trash

  if (trashDataValue) {
    document.querySelector(`[data-todo="${trashDataValue}"]`).remove()
  }
}

formAddTodo.addEventListener('submit', event => {
  event.preventDefault()  

  const inputValue = event.target.add.value.trim()  
  addTodo(inputValue)
})

todosContainer.addEventListener('click', event => {
  const clickedElement = event.target
  removeTodo(clickedElement)
})

const filterTodos = (todos, inputValue, returnMatchedTodo) => {  
  return todos
    .filter(todo => {
      const matchedTodo = todo.textContent.toLowerCase().includes(inputValue)
      return returnMatchedTodo ? matchedTodo : !matchedTodo
    }) 
} 

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos
    .forEach(todo => {
      todo.classList.remove(classToAdd)      
      todo.classList.add(classToRemove)
    })
}

const hideTodo = (todos, inputValue) => {
  const todosToHide = filterTodos(todos, inputValue, false)
  manipulateClasses(todosToHide, 'd-flex', 'hidden')
}

const showTodos = (todos, inputValue) => {
  const todosToShow = filterTodos(todos, inputValue, true)
  manipulateClasses(todosToShow, 'hidden', 'd-flex')
}

inputFormSearch.addEventListener('input', event => {
  const inputValue = event.target.value.toLowerCase().trim()  
  const todos = Array.from(todosContainer.children)

  hideTodo(todos, inputValue)
  showTodos(todos, inputValue)
})