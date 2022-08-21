export type NewTodoItem = {
  title: string;
};

export type Item = {
  title: string;
  completed: boolean;
  url: string;
  order?: number;
};

export type ItemPatch = {
  title?: string;
  completed?: boolean;
  order?: number;
};

//Add empty array to start with
//and it will get new todos as the functions below get executed
let list: Array<Item> = [];

export function listToDos(): Array<Item> {
  return list;
}

let todoIndex = 0;

export function addTodo(
  item: NewTodoItem,
  dynamicURL: string = "http://localhost:3000"
) {
  const listItem = {
    ...item,
    completed: false,
    url: `${dynamicURL}/api/todos/${todoIndex}`,
  };
  list.push(listItem);
  todoIndex++;
  return listItem;
}

export const deleteAllTodos = (): Array<Item> => {
  list = [];
  return list;
};

export const deleteTodo = (todoId: number): void => {
  // filter by id and delete the todo with the specific ID
  //change the existing list to be the same as the list below
  list = list.filter((item) => {
    const todoItem = item.url.split("/");
    const currentToDoId = todoItem[todoItem.length - 1];
    //do not keep todo with the ID
    return Number(currentToDoId) !== todoId;
  });
};

export const getTodoByID = (todoId: number): Item | undefined => {
  //todo: in list, find the todo with the ID
  return list.find((item) => {
    const todoItem = item.url.split("/");
    const currentToDoId = todoItem[todoItem.length - 1];
    //return the item with ID when it is true
    return Number(currentToDoId) === todoId;
  });
};

export const modifyTodo = (
  modifiedItem: ItemPatch,
  todoId: number
): Item | undefined => {
  //find the specific item to change
  const specificTodo = getTodoByID(todoId);
  //overwrite existing one with new one in the specific one
  if (specificTodo && modifiedItem.title) {
    specificTodo.title = modifiedItem.title;
  }
  if (specificTodo && modifiedItem.completed !== undefined) {
    specificTodo.completed = modifiedItem.completed;
  }
  if (specificTodo && modifiedItem.order) {
    specificTodo.order = modifiedItem.order;
  }
  //return the overwritten one
  return specificTodo;
};
