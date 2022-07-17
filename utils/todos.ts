export type NewTodoItem = {
  title: string;
};

export type Item = {
  title: string;
  completed: boolean;
  url: string;
};

//Add empty array to start with
let list: Array<Item> = [];

export function listToDos(): Array<Item> {
  return list;
}

let todoIndex = 0;

export function addTodo(item: NewTodoItem) {
  const listItem = {
    ...item,
    completed: false,
    url: `http://localhost:3000/api/todos/${todoIndex}`,
  };
  list.push(listItem);
  todoIndex++;
  return listItem;
}

export const deleteAllTodos = (): Array<Item> => {
  list = [];
  return list;
};

export const getTodoByID = (todoId: number): Item | undefined => {
  //todo: in list, find the todo with the ID
  return list.find((item) => {
    const todoItem = item.url.split("/");
    const currentToDoId = todoItem[todoItem.length - 1];
    return Number(currentToDoId) === todoId;
  });
};
