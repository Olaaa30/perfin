router.put('/users/:id/role', auth, async (req, res) =>{
    try {
        const { role } = req.body;
        let user = await user.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (req.user.role !== 'admin'){
            return res.status(403).json({ msg: 'Permission denied' });
        }

        user.role = role;
        await user.save();
        res.json({
            msg: "User role updated successfully", user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
        
    }
})