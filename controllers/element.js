var fs = require("fs");
const path = require("path");
const elemento = require("../models/elementos");
const historicoElementos = require("../models/HistoricoElementos");
var formidable = require("formidable");

exports.getSingleVideo = (req, res, next) => {
	const { userId, guidVideo } = req.params;

	console.log(userId);

	const range = req.headers.range;
	if (!range) {
		res.status(400).send("Requires Range header");
	}

	elemento
		.findOne({
			where: {
				chaveGUID: guidVideo,
			},
		})
		.then((elemento) => {
			// get os tamanho do video
			const videoPath = elemento.Link;
			const videoSize = fs.statSync(elemento.Link).size;

			// Parse Range
			// Exemplo: "bytes=32324-"
			const CHUNK_SIZE = 10 ** 6; // 1MB
			const start = Number(range.replace(/\D/g, ""));
			const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

			if (start == 0) {
				console.log("comecou", start);
			}

			const contentLength = end - start + 1;
			const headers = {
				"Content-Range": `bytes ${start}-${end}/${videoSize}`,
				"Accept-Ranges": "bytes",
				"Content-Length": contentLength,
				"Content-Type": "video/x-msvideo",
			};

			// HTTP Status 206 para Conteúdo parcial
			res.writeHead(206, headers);

			// Cria o readStream desde o byte especificado até o outro
			const videoStream = fs.createReadStream(videoPath, { start, end });

			// Strema o pedaço de video para o cliente
			videoStream.pipe(res);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getAllElements = (req, res, next) => {
	const { idPai } = req.params;

	elemento
		.findAll({
			where: {
				idPai: idPai,
			},
		})
		.then((elementos) => {
			res.send(elementos);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getElementfolders = (req, res, next) => {
	elemento
		.findAll({
			where: {
				idPai: null,
			},
		})
		.then((elementos) => {
			res.send(elementos);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.salvaHistorico = async (req, res, next) => {
	var payload = { ...req.body };

	var elementoGUID = req.body.guidElemento;
	var userId = req.body.userId;

	var ultimoRegistro = await historicoElementos.findOne({
		attributes: ["dataAcesso"],
		where: { guidElemento: elementoGUID, IdUsuario: userId },
		order: [["dataAcesso", "DESC"]],
	});

	if (!aconteceuNaMesmaHora(ultimoRegistro.dataAcesso)) {
		console.log("ultimoRegistro", ultimoRegistro);

		historicoElementos
			.create({
				guidElemento: elementoGUID,
				IdUsuario: userId,
				dataAcesso: dateAgora,
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
};

exports.postAddPasta = (req, res, next) => {
	const Nome = req.body.nome;
	const Descricao = req.body.descricao;
	const IdPai = payload.idpai;

	if (!!IdPai) {
		//não é pasta
		///processa o arquivo
	} else {
		//é pasta
		elemento
			.create({
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

exports.postAddArquivo = (req, res, next) => {
	var formData = new formidable.IncomingForm();
	formData.maxFileSize = 1000 * 1024 * 1204;

	formData.parse(req, function (error1, fields, files) {
		var oldPath = files.arquivo.path;

		var newPath = `${path.join(__dirname, "../")}public/${
			fields.tipo
		}/${new Date().getTime()} - ${files.arquivo.name}`;

		console.log(newPath);

		var nome = fields.nome;
		var descricao = fields.Descricao;
		var tipo = fields.tipo;
		var idPai = fields.idPai;

		//quando os videos tiverem thumb
		// var oldPathThumbnail = files.thumbnail.path;
		// var thumbnail = "public/thumbnails/" + new Date().getTime() + "-" + files.thumbnail.name;

		// fs.rename(oldPathThumbnail, thumbnail, function (error2) {
		// 	console.log("thumbnail upload error = ", error2);
		// });

		fs.rename(oldPath, newPath, function (error2) {
			var currentTime = new Date().getTime();

			elemento
				.create({
					Nome: nome,
					Descricao: descricao,
					IdPai: idPai,
					Tipo: tipo,
					Link: newPath,
					Ativo: true,
				})
				.then((result) => {
					// console.log(result);
					console.log("Elemento criado");
					res.send({ message: "Elemento criada com sucesso" });
				})
				.catch((err) => {
					console.log(err);
				});
		});
	});
};

const aconteceuNaMesmaHora = (data2) => {
	var data1 = new Date();

	if (!data2) {
		return false;
	}

	return (
		data1.getFullYear() === data2.getFullYear() &&
		data1.getMonth() === data2.getMonth() &&
		data1.getDate() === data2.getDate() &&
		data1.getHours() === data2.getHours()
	);
};
