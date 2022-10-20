const express = require("express");
const router = express.Router();
const {getListFiles, download} = require("../controller/fileController");

let routes = (app) => {
  router.get("/files", getListFiles);
  router.get("/files/:name", download);

  app.use(router);
};

module.exports = routes;
