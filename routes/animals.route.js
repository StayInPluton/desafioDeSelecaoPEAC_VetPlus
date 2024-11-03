const express = require("express");
const {
  postAnimalSingUP,
  getHome,
  getAnimalList,
  getAnimalRegisterPage,
  deleteAnimal,
  getAnimalEditPage,
  patchAnimal,
} = require("../controller/animals.controller");
const router = express.Router();

// get routes
router.get("/", getHome);

router.get("/lista", getAnimalList);

router.get("/cadastro", getAnimalRegisterPage);

// post routes
router.post("/cadastrarAnimal", postAnimalSingUP);

// update routes
router.get("/editarAnimal/edit/:id", getAnimalEditPage);
router.post("/editar", patchAnimal);

// delete routes
router.post("/deletarAnimal", deleteAnimal);

module.exports = router;
