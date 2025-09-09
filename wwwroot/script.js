const apiUrl = "https://sugaiapi.azurewebsites.net/api/todoitems";

async function loadTodos() {
  const response = await fetch(apiUrl);
  const todos = await response.json();
  const list = document.getElementById("todoList");
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = `${todo.name} - ${todo.isComplete ? "✅" : "❌"}`;
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("todoInput");
  const newTodo = { name: input.value, isComplete: false };
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  input.value = "";
  loadTodos();
}

window.onload = loadTodos;
