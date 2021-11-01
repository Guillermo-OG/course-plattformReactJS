const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Elementos = require("./models/elementos");
const HistoricoElementos = require("./models/HistoricoElementos");

const app = express();

const adminRoutes = require("./routes/admin");
const elementRoutes = require("./routes/element");

app.use(cors());
app.use(bodyParser.json({ limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/admin", adminRoutes);
app.use("/api/elemento", elementRoutes);

app.use(errorController.get404);

sequelize
	.sync()
	.then((result) => {
		// console.log(result)
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});
