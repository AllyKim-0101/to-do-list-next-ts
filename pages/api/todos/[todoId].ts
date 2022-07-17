import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "../../../utils/middleware";
import { getTodoByID, listToDos } from "../../../utils/todos";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD", "DELETE"],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  const { todoId } = req.query;

  //return title of that specfic todos with the certain ID
  //[{title:'abc', completed: false, url: `http://localhost:3000/api/todos/${todoIndex}`}]

  res.json(getTodoByID(Number(todoId)));
}
