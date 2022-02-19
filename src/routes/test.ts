export const route = {
    method: "get",
    execute: async (req, res) => {
        res.send({
            message: "Hello world!"
        })
    }
}
