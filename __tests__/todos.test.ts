import { listToDos, addTodo, deleteAllTodos } from "../pages/api/todos";

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
});
