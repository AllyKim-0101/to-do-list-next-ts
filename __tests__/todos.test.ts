import {
  addTodo,
  deleteAllTodos,
  getTodoByID,
  listToDos,
  modifyTodo,
} from "../utils/todos";

describe("listToDos function", () => {
  it("returns empty array", () => {
    const result = listToDos();
    expect(result).toEqual([]);
  });

  describe("after adding toDo", () => {
    it("returns a new todo", () => {
      addTodo({ title: "a todo" });
      const result = listToDos();
      expect(result.length).toEqual(1);
    });

    describe("after delete", () => {
      it("returns empty array", () => {
        deleteAllTodos();
        const result = listToDos();
        expect(result).toEqual([]);
      });
    });
  });
});

describe("addTodo function", () => {
  it("adds a property 'completed: false", () => {
    let result = addTodo({ title: "clean up the kitchen, Adam" });
    expect(result).toHaveProperty("completed", false);
  });
  it("adds a url", () => {
    let result = addTodo({ title: "eat lunch" });
    expect(result.url).toEqual("http://localhost:3000/api/todos/2");
  });
});

describe("getTodoByID", () => {
  it("should return only one object", () => {
    let result = getTodoByID(2);
    expect(result).toEqual({
      title: "eat lunch",
      completed: false,
      url: "http://localhost:3000/api/todos/2",
    });
  });
});

describe("modifyTodo", () => {
  it("should return modified to-do-item of title", () => {
    let result = modifyTodo({ title: "eat dinner" }, 2);
    expect(result).toEqual({
      title: "eat dinner",
      completed: false,
      url: "http://localhost:3000/api/todos/2",
    });
  });
  it("should return modified to-do-item of completed", () => {
    let result = modifyTodo({ completed: true }, 2);
    expect(result).toEqual({
      title: "eat dinner",
      completed: true,
      url: "http://localhost:3000/api/todos/2",
    });
  });
});
