const healthCheck = (req, res) => {

    res.status(200).json({
        success: true,
        message: "Sales CRM Backend is Running 🚀"
    });

};

export default healthCheck;