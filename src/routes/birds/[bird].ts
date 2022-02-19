export const route = {
    method: "get",
    execute: async (req, res) => {
       const { bird } = req.params;
        res.send({
            message: "You hit the route /birds/" + bird;
        })
    }
}
