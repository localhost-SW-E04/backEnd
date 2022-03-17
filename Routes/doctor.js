const router = require('express').Router();
let Doctor = require('../Model/Doctors.model');
var bcrypt = require('bcryptjs');



router.route('/signup').post(async (req, res) => {
    // const name = req.body.name;
    const { aadharno, tags, desc, specialisation, name, password, cpassword } = req.body;
    const existingUser = await Doctor.findOne({ aadharno: aadharno });


    if (existingUser) {
        res.json('user already exists');
        // console.log(existingUser);

    }
    else {
        if (password !== cpassword) {
            res.status(500).json('cpassword and password are not same');
        }
        else {
            const salt = await bcrypt.genSaltSync(10);
            const encryptedPassword = await bcrypt.hashSync(password, salt);
            const newDoctor = new Doctor({
                tags,
                desc,
                specialisation,
                aadharno,
                name,
                password: encryptedPassword
            });
            newDoctor.save()
                .then(() => res.json('user added'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
    }
})




router.route('/signin').post(async (req, res) => {
    const { aadharno, password } = req.body;

    try {
        if (!password || !aadharno) {
            return res.status(404).json({ message: 'enter all details' })
        }

        const existingUser = await Doctor.findOne({ aadharno: aadharno })
        if (existingUser) {

            const ispassCorrect = await bcrypt.compare(password, existingUser.password)
            if (!ispassCorrect) {
                return res.json("password is incorrect");
            }
            else {
                res.json({ status: "you are signed in", uid: aadharno });
            }
        } else { res.json("invalid user") }
    }
    catch (error) {
        res.status(404).json({ message: `${error} Something went wrong` })
    }
})


router.route('/:aadharno').get((req, res) => {
    const aadharno = req.params.aadharno;
    Doctor.findOne({ "aadharno": aadharno })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(`Error: ` + err));

});

module.exports = router;