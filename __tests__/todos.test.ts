import { listToDos } from "../pages/api/todos";

describe("listToDos", () => {
  it("return empty array", () => {
    const result = listToDos();
    expect(result).toEqual([]);
  });
});
