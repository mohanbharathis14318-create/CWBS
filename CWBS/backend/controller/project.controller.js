// DB Connection
import pool from "../config/db_config.js";

// Add Project
export const AddProject = async (req, res) => {

    try {

        const {
            start_date,
            end_date,
            project_name,
            project_area,
            rate_per_sqft,
            area_sqft,
            construction_cost,
            construction_budget,
            septic_tank,
            s_gst_percent,
            s_gst_amount,
            c_gst_percent,
            c_gst_amount,
            i_gst_percent,
            i_gst_amount,
            plot_cost,
            plot_sqft,
            project_remarks
        } = req.body;

        const projectInsert = await pool.query(
            `INSERT INTO project_table (
                start_date, end_date, project_name, project_area, rate_per_sqft, area_sqft,
                construction_cost, construction_budget, septic_tank,
                s_gst_percent, s_gst_amount, c_gst_percent, c_gst_amount,
                i_gst_percent, i_gst_amount,
                plot_cost, plot_sqft, project_remarks
              ) 
             VALUES 
                ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) 
            RETURNING project_id`,
            [
                start_date, end_date, project_name, project_area, rate_per_sqft, area_sqft,
                construction_cost, construction_budget, septic_tank,
                s_gst_percent, s_gst_amount, c_gst_percent, c_gst_amount,
                i_gst_percent, i_gst_amount,
                plot_cost, plot_sqft, project_remarks
            ]
        );

        const projectId = projectInsert.rows[0].project_id;

        // Insert amenities
        for (const amenity of req.body.amenities) {
            await pool.query(
                `INSERT INTO amenities (project_id, amenities_item, amenities_amount) VALUES ($1, $2, $3)`,
                [projectId, amenity.amenities_item, amenity.amenities_amount]
            );
        }

        // Insert extra items
        for (const extra of req.body.extra) {
            await pool.query(
                `INSERT INTO extra_items (project_id, extra_item, extra_amount) VALUES ($1, $2, $3)`,
                [projectId, extra.extra_item, extra.extra_amount]
            );
        }

        // Insert documents
        for (const doc of req.body.doc) {
            await pool.query(
                `INSERT INTO documents (project_id, doc_item, doc_amount) VALUES ($1, $2, $3)`,
                [projectId, doc.doc_item, doc.doc_amount]
            );
        }


        res.status(200).json({ msg: 'Project successfully added' });

    } catch (e) {

        console.error("Error in AddProject", e);

        res.status(500).json({ msg: `Error in Add Project ${e}` });
    }

}

// Fetch Project Details
export const GetProjectDetails = async (req, res) => {

    try {

        const ProjectData = await pool.query(
            `SELECT
                 p.*,
                 COALESCE(
                         (
                             SELECT json_agg(json_build_object(
                                     'amenities_item', a.amenities_item,
                                     'amenities_amount', a.amenities_amount
                                             ))
                             FROM amenities a
                             WHERE a.project_id = p.project_id
                         ), '[]'
                 ) AS amenities,
                 COALESCE(
                         (
                             SELECT json_agg(json_build_object(
                                     'extra_item', e.extra_item,
                                     'extra_amount', e.extra_amount
                                             ))
                             FROM extra_items e
                             WHERE e.project_id = p.project_id
                         ), '[]'
                 ) AS extra,
                 COALESCE(
                         (
                             SELECT json_agg(json_build_object(
                                     'doc_item', d.doc_item,
                                     'doc_amount', d.doc_amount
                                             ))
                             FROM documents d
                             WHERE d.project_id = p.project_id
                         ), '[]'
                 ) AS doc
             FROM project_table p`,
        );

        console.log(ProjectData.rows);

        res.status(200).json({ msg: "Fetching Data", ProjectData: ProjectData.rows });

    } catch (e) {

        console.error("Error on fetch Project", e);

        res.status(500).json({ msg: `Failed to fetch Project ${e}` });
    }

}

// Get Project Details By Id
export const GetProjectById = async (req, res) => {

    try {

        const { id } = req.params;

        const ProjectDataById = await pool.query(
            "SELECT * FROM project_table WHERE project_id = $1",
            [id]
        );

        console.log(ProjectDataById.rows);

        res.status(200).json({ msg: "Fetching Data", ProjectData: ProjectDataById.rows[0] });

    } catch (e) {

        console.error("Error on fetch Project By Id", e);

        res.status(500).json({ msg: `Failed to fetch Project By Id ${e}` });
    }
};

// Update Status
export const UpdateStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;

        // Update Based on Project ID
        await pool.query(

            'UPDATE project_table SET status = $1 WHERE project_id = $2',

            [status, id]

        );

        res.status(200).json({ msg: `Added to ${status}` });

    } catch (e) {

        console.error("Error on Update Status", e);

        res.status(500).json({ msg: `Failed to update Status ${e}`, });
    }
};

// Update Project Details
export const UpdateProjectDetail = async (req, res) => {

    try {
        const { id } = req.params;

        const {
            start_date,
            end_date,
            project_name,
            project_area,
            rate_per_sqft,
            area_sqft,
            construction_cost,
            construction_budget,
            septic_tank,
            s_gst_percent,
            s_gst_amount,
            c_gst_percent,
            c_gst_amount,
            i_gst_percent,
            i_gst_amount,
            plot_cost,
            plot_sqft,
            project_remarks,
            amenities,
            extra,
            doc
        } = req.body;

        // Update main project details
        await pool.query(
            `UPDATE project_table SET
                start_date=$1, end_date=$2, project_name=$3, project_area=$4,
                rate_per_sqft=$5, area_sqft=$6, construction_cost=$7,
                construction_budget=$8, septic_tank=$9,
                s_gst_percent=$10, s_gst_amount=$11,
                c_gst_percent=$12, c_gst_amount=$13,
                i_gst_percent=$14, i_gst_amount=$15,
                plot_cost=$16, plot_sqft=$17,
                project_remarks=$18
             WHERE project_id=$19`,
            [
                start_date, end_date, project_name, project_area, rate_per_sqft, area_sqft,
                construction_cost, construction_budget, septic_tank,
                s_gst_percent, s_gst_amount, c_gst_percent, c_gst_amount,
                i_gst_percent, i_gst_amount,
                plot_cost, plot_sqft, project_remarks,
                id
            ]
        );

        // Clear old related records
        await pool.query(`DELETE FROM amenities WHERE project_id=$1`, [id]);
        await pool.query(`DELETE FROM extra_items WHERE project_id=$1`, [id]);
        await pool.query(`DELETE FROM documents WHERE project_id=$1`, [id]);

        // Insert new amenities
        for (const amenity of amenities) {
            await pool.query(
                `INSERT INTO amenities (project_id, amenities_item, amenities_amount) VALUES ($1, $2, $3)`,
                [id, amenity.amenities_item, amenity.amenities_amount]
            );
        }

        // Insert new extra items
        for (const extraItem of extra) {
            await pool.query(
                `INSERT INTO extra_items (project_id, extra_item, extra_amount) VALUES ($1, $2, $3)`,
                [id, extraItem.extra_item, extraItem.extra_amount]
            );
        }

        // Insert new documents
        for (const document of doc) {
            await pool.query(
                `INSERT INTO documents (project_id, doc_item, doc_amount) VALUES ($1, $2, $3)`,
                [id, document.doc_item, document.doc_amount]
            );
        }

        res.status(200).json({ msg: "Project updated successfully" });

    } catch (e) {

        console.error("Error updating project", e);

        res.status(500).json({ msg: `Failed to update project: ${e.message}` });
    }

};

// Delete Project
export const DeleteProjectDetail = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM project_table WHERE project_id = $1",
            [id]
        );

        res.status(200).json({ msg: "Project deleted successfully" });

    } catch (e) {

        console.error("Error Deleting project Details", e);

        res.status(500).json({ msg: "Failed to delete Project detail" });

    }

};