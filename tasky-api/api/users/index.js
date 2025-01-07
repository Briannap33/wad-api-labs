import express from 'express';
import User from './userModel';

const router = express.Router(); 
const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register/Authenticate User
router.post('/', async (req, res) => {
    if (!req.body.password) {
        return res.status(400).json({ message: 'Password is required' });
    }
     if (!passwordValidator.test(req.body.password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, include at least one letter, one digit, and one special character (@$!%*#?&)' });
    }

    if (req.query.action === 'register') {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            code: 201,
            msg: 'Successfully created a new user.',
        });
    } else {  // Authenticate User
        const user = await User.findOne(req.body);
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed' });
        } else {
            return res.status(200).json({ code: 200, msg: 'Authentication Successful', token: 'TEMPORARY_TOKEN' });
        }
    }
});
// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

export default router;