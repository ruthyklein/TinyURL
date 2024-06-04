import User from "../models/userModel.js";
const userController = {
    createUser: async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(500).send({ error: 'An error occurred while creating the user.' });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('links');
            res.send(user);
        } catch (error) {
            res.status(500).send({ error: 'An error occurred while fetching the user.' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.send(users);
        } catch (error) {
            res.status(500).send({ error: 'An error occurred while fetching users.' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.send(user);
        } catch (error) {
            res.status(500).send({ error: 'An error occurred while updating the user.' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.send({ message: 'User deleted' });
        } catch (error) {
            res.status(500).send({ error: 'An error occurred while deleting the user.' });
        }
    },
    // הוסף פונקציה חדשה כדי לקבל קישורים של משתמש
getUserLinks: async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('links');
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }
        res.send(user.links);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching the user links.' });
    }
},

};

export default userController;
