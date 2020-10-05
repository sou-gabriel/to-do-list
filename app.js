const formAddTodo = document.querySelector('.form-add-todo')
const inputFormSearch = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')

formAddTodo.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()

  if (inputValue.length) {
    todosContainer.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
      </li>`  
    event.target.reset()
  }
})

todosContainer.addEventListener('click', event => {
  const clickedElement = event.target

  if (clickedElement.dataset.trash) {
    document.querySelector(`[data-todo="${clickedElement.dataset.trash}"]`).remove()
  }
})

inputFormSearch.addEventListener('input', event => {
  const inputValue = event.target.value.trim()

  Array.from(todosContainer.children)
    .filter(todo => !todo.textContent.includes(inputValue))
    .forEach(todo => {
      todo.classList.remove('d-flex')      
      todo.classList.add('hidden')
    })
  Array.from(todosContainer.children)
    .filter(todo => todo.textContent.includes(inputValue))
    .forEach(todo => {
      todo.classList.remove('hidden')      
      todo.classList.add('d-flex')
    })
  
})