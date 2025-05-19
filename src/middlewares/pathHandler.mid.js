const pathHandler = (req, res) => {
    const error = "URL not found"
    const {method, originalUrl } = req
    res.status(404).json({error, method, originalUrl});
};
export default pathHandler;