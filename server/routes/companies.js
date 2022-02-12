const Company = require("../models/company");
const { Op } = require("sequelize");
const Founder = require("../models/founder");

const router = require("express").Router();

router
    .route("/companies")
    .get(async(req, res) => {
        try {
            const { filterNume } = req.query;
            const { filterData } = req.query;
            const { sortBy } = req.query;
            if (filterNume && filterData) {
                const companies = await Company.findAll({
                    where: {
                        data: {
                            [Op.eq]: filterData
                        },
                        nume: {
                            [Op.eq]: filterNume
                        }
                    },
                    attributes: ["id", "nume", "data"],
                    order: sortBy ? [
                        [sortBy, "ASC"]
                    ] : undefined
                });
                return res.status(200).json(companies);
            } else {
                const companies = await Company.findAll();
                return res.status(200).json(companies);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .post(async(req, res) => {
        try {
            if (req.body.nume.length >= 3) {
                const newCompany = await Company.create(req.body);
                return res.status(200).json(newCompany);
            } else {
                return res.status(500).json(err);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })

router
    .route("/companies/:id")
    .get(async(req, res) => {
        try {
            const company = await Company.findByPk(req.params.id);
            if (company) {
                return res.status(200).json(company);
            } else {
                return res.status(404).json({ error: `Company with id ${req.params.id} not found!` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .put(async(req, res) => {
        try {
            const company = await Company.findByPk(req.params.id);
            if (req.body.nume.length >= 3) {
                if (company) {
                    const updateCompany = await Company.update(req.body, { where: { id: req.params.id } });
                    return res.status(200).json({ message: `Company updated!` });
                } else {
                    return res.status(404).json({ error: `Company with id ${req.params.id} not found!` });
                }
            } else {
                return res.status(404).json({ error: `Nume prea scurt!` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .delete(async(req, res) => {
        try {
            const company = await Company.findByPk(req.params.id);
            if (company) {
                const deleteCompany = await company.destroy();
                return res.status(200).json(deleteCompany);
            } else {
                return res.status(404).json({ error: `Company with id ${req.params.id} not found!` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    // import
router
    .route("/import")
    .post(async(req, res, next) => {
        try {
            for (let j of req.body) {
                const company = await Company.create(j);
                for (let c of j.founders) {
                    const founder = await Founder.create(c);
                    company.addFounder(founder);
                }
                await company.save();
            }
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    })

// export
router
    .route("/export")
    .get(async(req, res, next) => {
        try {
            let exp = [];
            const companies = await Company.findAll();
            for (let j of companies) {
                const company = {
                    nume: j.nume,
                    data: j.data,
                    Founders: []
                }

                for (let c of await j.getFounders()) {
                    company.Founders.push({
                        nume: c.nume,
                        rol: c.rol
                    });
                }
                exp.push(company);
            }
            if (exp.length > 0) {
                res.json({ export: exp });
            } else {
                res.sendStatus(204);
            }
        } catch (err) {
            next(err);
        }
    })

router
    .route("/sort")
    .get(async(req, res) => {
        try {
            const { sortBy } = req.query;
            const companies = await Company.findAll({
                attributes: ["id", "nume", "data"],
                order: sortBy ? [
                    [sortBy, "ASC"]
                ] : undefined
            });
            return res.status(200).json(companies);
        } catch (err) {
            return res.status(500).json(err);
        }
    })
module.exports = router;