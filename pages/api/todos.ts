// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "../../utils/middleware";
import { addTodo, deleteAllTodos, listToDos } from "../../utils/todos";
import { listToDos as listToDosFromDatabase } from "../../utils/db";

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
    const scheme = req.headers["x-forwarded-proto"] || "http";
    const dynamicURL = `${scheme}://${req.headers.host}`;
    //sending response to client
    res.json(addTodo(req.body, dynamicURL));
  } else if (req.method === "DELETE") {
    res.json(deleteAllTodos());
  } else {
    //sending response to client
    res.json(await listToDosFromDatabase());
  }
}
