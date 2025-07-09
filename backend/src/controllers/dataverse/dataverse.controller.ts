import { Request, Response } from "express";
import * as dataverseService from "../../services/dataverse/dataverse.service";

export const getCounts = async (_req: Request, res: Response) => {
  try {
    const counts = await dataverseService.fetchCounts();
    res.json(counts);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts", e: error });
  }
};

export const getData = async (req: Request, res: Response) => {
  const {
    q = "*",
    sort = "date",
    order = "desc",
    page = 1,
    per_page = 6,
    types = [],
    subtree,
  } = req.body;
  console.log("in controller", req.body);
  console.log(req.url);
  try {
    const data = await dataverseService.fetchData(
      page,
      per_page,
      q,
      sort,
      order,
      types,
      subtree
    );
    res.json(data);
  } catch (error: any) {
    res.status(error.status || 500).json({
      error: error,
      message: error.message || "Unknown error",
      ...(error.requestUrl ? { requestUrl: error.requestUrl } : {}),
    });
  }
};
