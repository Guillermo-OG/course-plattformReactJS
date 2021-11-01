const Elemento = require("../models/elementos");

exports.getAllElements = (req, res, next) => {
	Elemento.findAll()
		.then((elementos) => {
			res.send(elementos);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postAddPasta = (req, res, next) => {
	var payload = { ...req.body };
	console.log("Ta chegaaano");
	console.log(payload);

	const Nome = req.body.nome;
	const Descricao = req.body.descricao;
	const IdPai = payload.idpai;

	if (!!IdPai) {
		//não é pasta
		///processa o arquivo
	} else {
		//é pasta
		Elemento.create({
			Nome: Nome,
			Descricao: Descricao,
			IdPai: IdPai,
			Ativo: true,
		})
			.then((result) => {
				// console.log(result);
				console.log("Pasta criada");
				res.send({ message: "Pasta criada com sucesso" });
			})
			.catch((err) => {
				console.log(err);
			});
	}
	const price = req.body.price;
	const description = req.body.description;

	// const title = req.body.title;
	// const imageUrl = req.body.imageUrl;
	// const price = req.body.price;
	// const description = req.body.description;
	// Product.create({
	//   title: title,
	//   price: price,
	//   imageUrl: imageUrl,
	//   description: description
	// })
	//   .then(result => {
	//     // console.log(result);
	//     console.log('Created Product');
	//     res.redirect('/admin/products');
	//   })
	//   .catch(err => {
	//     console.log(err);
	//   });
};

exports.postAddVideo = (req, res, next) => {
	var payload = { ...req.body };
	console.log("Ta chegaaano");
	console.log(payload);
};
