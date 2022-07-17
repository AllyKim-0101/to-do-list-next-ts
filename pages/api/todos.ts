// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "../../utils/middleware";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD", "DELETE"],
});

// anytime API gets request, it will execute the function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  // Add title
  if (req.method === "POST") {
    //sending response to client
    res.json(addTodo(req.body));
  } else if (req.method === "DELETE") {
    deleteAllTodos();
    res.json(listToDos());
  } else {
    //sending response to client
    res.json(listToDos());
  }
}

type NewTodoItem = {
  title: string;
};

type Item = {
  title: string;
  completed: boolean;
};

let list: Array<Item> = [];

export function listToDos(): Array<Item> {
  //Add empty array to start with
  return list;
}

export function addTodo(item: NewTodoItem) {
  const listItem = { ...item, completed: false };
  list.push(listItem);
  return listItem;
}

export const deleteAllTodos = (): void => {
  list = [];
};
