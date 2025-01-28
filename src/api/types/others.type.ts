import express from "express";

export interface IRoute {
  path: string;
  route: express.Router;
}
