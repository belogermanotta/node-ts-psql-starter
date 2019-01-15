import express from "express";
import { Request, Response } from "express";
import { getFoos } from "./foo/repository";
const router = express.Router();



/**
 * GET /
 * Login page.
 */
export let index = async (req: Request, res: Response) => {
  const foos = await getFoos();
  console.log("get abc /", foos);

  res.render("foo/index.html", {
    foos
  });
};


router.get("/", index);

export default router;