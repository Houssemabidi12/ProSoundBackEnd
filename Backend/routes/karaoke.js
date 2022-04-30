const Karaoke = require("../models/Karaoke");


const router = require("express").Router();

//CREATE
//http://localhost:5000/api/karaoke/
router.post("/", async (req, res) => {
    const newKaraoke = new Karaoke(req.body);

    try {
        const savedKaraoke = await newKaraoke.save();
        res.status(200).json(savedKaraoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
//http://localhost:5000/api/Karaoke/:id
router.put("/:id", async (req, res) => {
    try {
        const updatedKaraoke = await Karaoke.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedKaraoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
//http://localhost:5000/api/Karaoke/:id
router.delete("/:id", async (req, res) => {
    try {
        await Karaoke.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET 
//http://localhost:5000/api/products/find/:id
router.get("/find/:id", async (req, res) => {
    try {
        const karaoke = await Karaoke.findById(req.params.id);
        res.status(200).json(karaoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
//http://localhost:5000/api/Karaoke/
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let karaokes;

        if (qNew) {
            karaokes = await Karaoke.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            karaokes = await Karaoke.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            karaokes = await Karaoke.find();
        }

        res.status(200).json(karaokes);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
