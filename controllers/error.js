exports.get404 = (req, res, next) => {
	console.log("deu erro");
	res.status(404).render("404");
};
