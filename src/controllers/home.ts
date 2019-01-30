import { Request, Response } from "express";
import { Chart } from "../models/Chart";

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  let chart = new Chart();
  chart.labels = ["a", "b", "c"]
  chart.data = [1, 2, 3];

  res.render("home", {
    title: "Home",
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    data: [12, 15, 3, 5, 2, 3]
  });
};
