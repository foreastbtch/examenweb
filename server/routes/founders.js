const Founder = require("../models/founder");
const Company = require("../models/company");

const router = require("express").Router();

const roluri = ["CEO", "CTO"];

router
    .route("/founders")
    .get(async(req, res) => {
        try {
            const founders = await Founder.findAll();
            return res.status(200).json(founders);
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .post(async(req, res) => {
        try {
            if (roluri.indexOf(req.body.rol) >= 0) {
                if (req.body.nume.length >= 5) {
                    const newFounder = await Founder.create(req.body);
                    return res.status(200).json(newFounder);
                } else {
                    return res.status(200).json({ message: "Nume prea scurt!" });
                }
            } else {
                return res.status(200).json({ message: "rolul nu este valid!" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })

router
    .route("/founders/:id")
    .get(async(req, res) => {
        try {
            const founder = await Founder.findByPk(req.params.id);
            if (founder) {
                return res.status(200).json(founder);
            } else {
                return res.status(404).json({ error: `Founder with id ${req.params.id} not found!` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .put(async(req, res) => {
        try {
            const founder = await Founder.findByPk(req.params.id);
            if (founder) {
                if (roluri.indexOf(req.body.rol) >= 0) {
                    if (req.body.nume.length >= 5) {
                        const updateFounder = await founder.update(req.body);
                        return res.status(200).json(updateFounder);
                    } else {
                        return res.status(404).json({ message: "Nume prea scurt!" });
                    }
                } else {
                    return res.status(404).json({ message: "Rol invalid" });
                }
            } else {
                return res.status(404).json({ error: `Founder with id ${req.params.id} not found!` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .delete(async(req, res) => {
        try {
            const founder = await Founder.findByPk(req.params.id);
            if (founder) {
                const deleteFounder = await founder.destroy();
                return res.status(200).json(deleteFounder);
            } else {
                return res.status(404).json({ error: `Founder with id ${req.params.id} not found!` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    // Get si Post pentru entitatea copil
router
    .route("/companies/:companyID/founders")
    .post(async(req, res, next) => {
        try {
            const company = await Company.findByPk(req.params.companyID);
            if (company) {
                if (roluri.indexOf(req.body.rol) >= 0) {
                    if (req.body.nume.length >= 5) {
                        const founder = new Founder(req.body);
                        founder.CompanyId = company.id;
                        await founder.save();
                        res.status(201).json({ message: "Founder created!" });
                    } else {
                        res.status(404).json({ message: "Nume prea scurt!" });
                    }
                } else {
                    res.status(404).json({ message: "Rol invalid!" });
                }
            } else {
                res.status(404).json({ message: "404 - Company not found!" });
            }
        } catch (err) {
            next(err);
        }
    })
    .get(async(req, res, next) => {
        try {
            const company = await Company.findByPk(req.params.companyID, {
                include: [Founder]
            });
            if (company) {
                res.status(200).json(company.Founders);
            } else {
                res.status(404).json({ message: "404 - Company not found!" });
            }
        } catch (err) {
            next(err);
        }
    })

// Update si Delete entitate copil
router
    .route("/companies/:companyID/founders/:founderID")
    .put(async(req, res, next) => {
        try {
            const company = await Company.findByPk(req.params.companyID);
            if (company) {
                if (roluri.indexOf(req.body.rol) >= 0) {
                    if (req.body.nume.length >= 5) {
                        const founders = await company.getFounders({ id: req.params.founderID });
                        founder = null;
                        for (c of founders) {
                            if (c.id == req.params.founderID) {
                                founder = c;
                            }
                        }
                        if (founder) {
                            founder.nume = req.body.nume;
                            founder.rol = req.body.rol;
                            await founder.save();
                            res.status(202).json({ message: `Founder ${founder.id} updated!` });
                        } else {
                            res.status(404).json({ message: "404 - Founder not found!" });
                        }
                    } else {
                        res.status(404).json({ message: "Nume prea scurt!" });
                    }
                } else {
                    res.status(404).json({ message: "Rol invalid!" });
                }
            } else {
                res.status(404).json({ message: "404 - Company not found!" });
            }
        } catch (err) {
            next(err);
        }
    })
    .delete(async(req, res, next) => {
        try {
            const company = await Company.findByPk(req.params.companyID);
            if (company) {
                const founders = await company.getFounders({ id: req.params.founderID });
                founder = null;
                for (c of founders) {
                    if (c.id == req.params.founderID) {
                        founder = c;
                    }
                }
                if (founder) {
                    await founder.destroy();
                    res.status(202).json({ message: "Founder deleted!" });
                } else {
                    res.status(404).json({ message: "404 - Founder not found!" });
                }
            } else {
                res.status(404).json({ message: "404 - Company not found!" });
            }
        } catch (err) {
            next(err);
        }
    })

module.exports = router;