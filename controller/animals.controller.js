const mongoose = require("mongoose");
require("../models/animals.model");
const Animal = mongoose.model("Animal");

//read controller
const getHome = (req, res) => {
  res.render("content/home", { title: "VetPlus" });
};

const getAnimalList = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.render("content/animalList", { animals: animals });
  } catch (err) {
    console.log("Erro ao listar animais: " + err);
    res.status(500).send("Erro ao listar animais");
  }
};

const getAnimalRegisterPage = (req, res) => {
  res.render("content/register", { title: "Cadastro de Animal" });
};

// create controller
const postAnimalSingUP = async (req, res) => {
  const newAnimal = {
    name: req.body.name,
    age: req.body.age,
    breed: req.body.breed,
    owner: req.body.owner,
    phone: req.body.phone,
    email: req.body.email,
    problem: req.body.problem,
  };

  const errors = [];
  if (
    !newAnimal.name ||
    typeof newAnimal.name == undefined ||
    newAnimal.name == null ||
    newAnimal.name.length < 2
  ) {
    errors.push({ text: "Nome inválido" });
  }
  if (
    !newAnimal.age ||
    typeof newAnimal.age == undefined ||
    newAnimal.age == null ||
    newAnimal.age < 0
  ) {
    errors.push({ text: "Idade inválida" });
  }
  if (
    !newAnimal.breed ||
    typeof newAnimal.breed == undefined ||
    newAnimal.breed == null ||
    newAnimal.breed.length < 2
  ) {
    errors.push({ text: "Raça inválida" });
  }
  if (
    !newAnimal.owner ||
    typeof newAnimal.owner == undefined ||
    newAnimal.owner == null ||
    newAnimal.owner.length < 3
  ) {
    errors.push({ text: "Dono inválido" });
  }
  if (
    !newAnimal.phone ||
    typeof newAnimal.phone == undefined ||
    newAnimal.phone == null ||
    newAnimal.phone.length < 8 ||
    newAnimal.phone.length > 11
  ) {
    errors.push({ text: "Telefone inválido" });
  }
  if (errors.length > 0) {
    res.render("content/register", { errors: errors });
  } else {
    await new Animal(newAnimal)
      .save()
      .then(() => {
        console.log("Animal cadastrado com sucesso!");
        res.redirect("/lista");
      })
      .catch((err) => {
        console.log("Erro ao cadastrar animal: " + err);
        //res.redirect('/');
      });
  }
};

//updade controller
const getAnimalEditPage = (req, res) => {
  Animal.findOne({ _id: req.params.id })
    .then((animal) => {
      res.render("content/edit", { animal: animal });
    })
    .catch((err) => {
      console.log("Erro ao editar animal: " + err);
      req.redirect("/lista");
    });
};

const patchAnimal = async (req, res) => {
  Animal.findOne({ _id: req.body.id })
    .then((animal) => {
      animal.name = req.body.name;
      animal.age = req.body.age;
      animal.breed = req.body.breed;
      animal.owner = req.body.owner;
      animal.phone = req.body.phone;
      animal.email = req.body.email;
      animal.problem = req.body.problem;

      animal
        .save()
        .then(() => {
          console.log("Animal atualizado com sucesso!");
          res.redirect("/lista");
        })
        .catch((err) => {
          console.log("Erro ao atualizar animal: " + err);
          res.redirect("/lista");
        });
    })
    .catch((err) => {
      console.log("Erro ao atualizar animal: " + err);
      res.redirect("/lista");
    });
};

//delete controller

const deleteAnimal = async (req, res) => {
  Animal.deleteOne({ _id: req.body.id })
    .then(() => {
      console.log("Animal deletado com sucesso!");
      res.redirect("/lista");
    })
    .catch((err) => {
      console.log("Erro ao deletar animal: " + err);
      res.redirect("/lista");
    });
};

module.exports = {
  postAnimalSingUP,
  getHome,
  getAnimalList,
  deleteAnimal,
  getAnimalRegisterPage,
  getAnimalEditPage,
  patchAnimal,
};
