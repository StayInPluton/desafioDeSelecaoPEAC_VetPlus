const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/animals.route");
const path = require("path");

// config handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("views", "./views");
app.set("view engine", "handlebars");

// config body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO fazer config mongoose e criar uma database
mongoose
  .connect("mongodb://localhost:27017/vetplus")
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB: " + err);
  });

// rotas
app.use("/", router);

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
