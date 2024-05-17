const testController = (req, res) => {
    res.status(200).send({
        message: "vaishnavi",
        success: true,
    });
};

module.exports = { testController };