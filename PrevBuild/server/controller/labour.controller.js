// DB Connection
import pool from "../config/db_config.js";

// Add Labour
export const AddLabour = async (req, res) => {

    try {

        const {
            project_name,
            total_mason_cost,
            total_centering_cost,
            total_plumbing_cost,
            total_electrical_cost,
            total_tiles_cost,
            total_carpenter_cost,
            total_painter_cost,
            total_other_cost,
            total_labour_cost
        } = req.body;

        const labourInsert = await pool.query(
            `INSERT INTO labour_master(project_name, total_mason_cost, total_centering_cost, total_plumbing_cost,
                                       total_electrical_cost, total_tiles_cost, total_carpenter_cost,
                                       total_painter_cost,
                                       total_other_cost, total_labour_cost)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING labour_id`,
            [
                project_name, total_mason_cost, total_centering_cost, total_plumbing_cost,
                total_electrical_cost, total_tiles_cost, total_carpenter_cost, total_painter_cost,
                total_other_cost, total_labour_cost
            ]
        );

        const labourId = labourInsert.rows[0].labour_id;

    } catch (e) {

        console.error("Error in AddLabour", e);

        res.status(500).json({msg: `Error in Add Labour ${e}`});

    }

};