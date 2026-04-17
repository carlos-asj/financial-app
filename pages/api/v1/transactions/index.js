import database from "infra/database.js";

async function transactions(request, response) {
    try {
        if (request.method === 'GET') {
            const data = await database.query("SELECT * FROM transactions;")
            console.log(data)
    
            response.status(200).json({
                message: "Working great!",
                data: data.rows[0]
            });
        } else if (request.method === 'POST') {
            const {bank, value, category, type, transaction_date} = request.body;

            const data = await database.query({
                text: `INSERT INTO transactions (bank, value, category, type, transaction_date)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                values: [bank, value, category, type, transaction_date]
            })

            console.log(data)
    
            response.status(200).json({
                message: "Working great!",
                data: data.rows[0]
            });
        }
    } catch (error) {
        console.log("\nError inside catch.")
        console.error(error);

        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export default transactions;