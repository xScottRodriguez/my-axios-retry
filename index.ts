/** @format */

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Request, Response } from "express";
import { customAxiosApi, globalConfig } from "./axios-retry";

const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.get("/api", (req: Request, res: Response) => {
  let resp = "";
  customAxiosApi.get("/", globalConfig).then((response: AxiosResponse) => {
    console.log("response", response);
    resp = response?.data ?? response;
  });

  return res.status(200).json(resp);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
