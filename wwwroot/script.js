const apiUrl = "https://sugaiapi.azurewebsites.net/api/todoitems";

async function loadTodos() {
  const response = await fetch(apiUrl);
  const todos = await response.json();
  const list = document.getElementById("todoList");
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${todo.name}</span>
            <button onclick="toggleTodo(${todo.id}, ${todo.isComplete})">
                ${todo.isComplete ? "✅ Done" : "❌ Not done"}
            </button>
        `;
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("todoInput");
  if (!input.value.trim()) return;
  const newTodo = { name: input.value, isComplete: false };
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  input.value = "";
  loadTodos();
}

async function toggleTodo(id, currentStatus) {
  const response = await fetch(`${apiUrl}/${id}`);
  const todo = await response.json();

  const updatedTodo = {
    ...todo,
    isComplete: !currentStatus,
  };

  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });

  loadTodos();
}

window.onload = loadTodos;
