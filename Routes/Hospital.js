const router = require('express').Router();
let Hospital = require('../Model/Hospital.model');



router.route('/add').post(async (req, res) => {
    const { location, bedsAvailable, totalBeds, doctors, bed } = req.body;

    try {
        if (!location || !bedsAvailable || !totalBeds || !doctors) {
            return res.status(404).json({ message: 'enter all details' })
        } else {
            const hospital = new Hospital({
                location,
                bed,
                bedsAvailable,
                totalBeds,
                doctors
            });

            hospital.save()
                .then(() => res.json("Successfully Saved"))
                .catch((err) => res.status(404).json(`error-> ${err}`))
        }


    }
    catch (error) {
        res.status(404).json({ message: `${error} Something went wrong` })
    }
})

router.route('/edit/:id').post(async (req, res) => {
    Hospital.findById(req.params.id)
        .then(hospital => {
            hospital.bedsAvailable = req.body.bedsAvailable;
            hospital.totalBeds = req.body.totalBeds;
            hospital.doctors = req.body.doctors;
            hospital.bed = req.body.bed;
            hospital.save()
                .then(() => res.json("Successfully updated"))
                .catch((err) => res.status(404).json(`error-> ${err}`))
        })
})
router.route('/').get(async (req, res) => {
    Hospital.find({})
        .then(hospital => res.json(hospital))
        .catch(err => res.status(404).json(`error-> ${err}`))
})
router.route('/delete/:id').delete((req, res) => {
    Hospital.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;