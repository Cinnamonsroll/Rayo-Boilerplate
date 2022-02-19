export const route = {
    method: "get",
    execute: async (req, res) => {
        res.send({
            message: "You hit the route /birds/red"
        })
    }
}
