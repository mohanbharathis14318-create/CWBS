// DB Connection
import pool from "../config/db_config.js";

// Add Labour
const AddLabour = async (req, res) => {

    try {

        if (req.user.role !== 'MD') {

            res.status(400).json({ msg: 'Not authorized' });

        }

        const MdId = req.user.id;

        // Req Labour data
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
            total_labour_cost,
        } = req.body;

        console.log("Req from The body: ", req.body);

        const LabourData = await pool.query(
            `INSERT INTO labour_master 
                (
                    project_name,
                    total_mason_cost,
                    total_centering_cost,
                    total_plumbing_cost,
                    total_electrical_cost,
                    total_tiles_cost,
                    total_carpenter_cost,
                    total_painter_cost,
                    total_other_cost,
                    total_labour_cost,
                    created_by
                ) 
             VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [
                project_name,
                total_mason_cost,
                total_centering_cost,
                total_plumbing_cost,
                total_electrical_cost,
                total_tiles_cost,
                total_carpenter_cost,
                total_painter_cost,
                total_other_cost,
                total_labour_cost,
                MdId
            ]
        );

        console.log("Labour master: ", LabourData);

        // || 8 Category Labour Insert

        // Req Data
        const {
            mason_master,
            centering_master,
            plumbing_master,
            electrical_master,
            tiles_master,
            carpenter_master,
            painter_master,
            other_master,
        } = req.body;

        // || Labour Id Extract
        const LabourId = LabourData.rows[0].labour_id;

        // Mason Data --------------------------------------------------------------------------------------------------
        const MasonData = await pool.query(
            `
                INSERT INTO mason_master 
                    (
                        labour_id,
                        mason_name,
                        mason_phone,
                        mason_address,
                     
                        mason_contract,
                        mason_contract_amount,
                     
                        mason_basement,
                        mason_basement_amount,
                     
                        mason_lintel,
                        mason_lintel_amount,
                     
                        mason_roof,
                        mason_roof_amount,
                     
                        mason_outer_plastering,
                        mason_outer_plastering_amount,
                     
                        mason_inner_plastering,
                        mason_inner_plastering_amount,
                    
                        mason_septic_tank,
                        mason_septic_tank_amount,
                    
                        mason_s_gst_percent,
                        mason_s_gst_amount,
                        mason_c_gst_percent,
                        mason_c_gst_amount,
                        mason_i_gst_percent,
                        mason_i_gst_amount   
                    ) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING *
            `,
            [
                LabourId,
                mason_master.mason_name,
                mason_master.mason_phone,
                mason_master.mason_address,

                mason_master.mason_contract,
                mason_master.mason_contract_amount,

                mason_master.mason_basement,
                mason_master.mason_basement_amount,

                mason_master.mason_lintel,
                mason_master.mason_lintel_amount,

                mason_master.mason_roof,
                mason_master.mason_roof_amount,

                mason_master.mason_outer_plastering,
                mason_master.mason_outer_plastering_amount,

                mason_master.mason_inner_plastering,
                mason_master.mason_inner_plastering_amount,

                mason_master.mason_septic_tank,
                mason_master.mason_septic_tank_amount,

                mason_master.mason_s_gst_percent,
                mason_master.mason_s_gst_amount,
                mason_master.mason_c_gst_percent,
                mason_master.mason_i_gst_amount,
                mason_master.mason_i_gst_percent,
                mason_master.mason_i_gst_amount,
            ]
        );

        // Mason Id
        const MasonId = MasonData.rows[0].mason_id;

        console.log("Mason items: " + mason_master.mason_items);

        // Store the mason Items
        for (let MasonItem of mason_master.mason_items)
        {

            await pool.query(
                `
                    INSERT INTO mason_items
                        (mason_id, mason_item_name, mason_item_amount, mason_item_remarks) 
                    VALUES 
                        ($1, $2, $3, $4) RETURNING *
                `,
                [
                    MasonId,
                    MasonItem.mason_item_name,
                    MasonItem.mason_item_amount,
                    MasonItem.mason_item_remarks,
                ]
            );

        }

        // Mason Data --------------------------------------------------------------------------------------------------



        // Centering Data ----------------------------------------------------------------------------------------------
        const CenteringData = await pool.query(
            `
                INSERT INTO centering_master
                    (
                        labour_id, 
                        centering_name, 
                        centering_phone, 
                        centering_address, 
                     
                        centering_contract, 
                        centering_contract_amount, 
                     
                        footing_ground, 
                        footing_ground_amount, 
                     
                        plinth_beam, 
                        plinth_beam_amount, 
                     
                        basement_column, 
                        basement_column_amount, 
                     
                        outer_plastering, 
                        outer_plastering_amount, 
                     
                        feet_column, 
                        feet_column_amount, 
                     
                        lintel_beam, 
                        lintel_beam_amount, 
                     
                        after_lintel_column, 
                        after_lintel_column_amount, 
                     
                        hide_beam, 
                        hide_beam_amount, 
                     
                        centering_roof, 
                        centering_roof_amount, 
                     
                        roof_beam, 
                        roof_beam_amount, 
                     
                        centering_s_gst_percent, 
                        centering_s_gst_amount, 
                        centering_c_gst_percent, 
                        centering_c_gst_amount, 
                        centering_i_gst_percent, 
                        centering_i_gst_amount 
                    ) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32) RETURNING *
            `,
            [
                LabourId,
                centering_master.centering_name,
                centering_master.centering_phone,
                centering_master.centering_address,

                centering_master.centering_contract,
                centering_master.centering_contract_amount,

                centering_master.footing_ground,
                centering_master.footing_ground_amount,

                centering_master.plinth_beam,
                centering_master.plinth_beam_amount,

                centering_master.basement_column,
                centering_master.basement_column_amount,

                centering_master.outer_plastering,
                centering_master.outer_plastering_amount,

                centering_master.feet_column,
                centering_master.feet_column_amount,

                centering_master.lintel_beam,
                centering_master.lintel_beam_amount,

                centering_master.after_lintel_column,
                centering_master.after_lintel_column_amount,

                centering_master.hide_beam,
                centering_master.hide_beam_amount,

                centering_master.centering_roof,
                centering_master.centering_roof_amount,

                centering_master.roof_beam,
                centering_master.roof_beam_amount,

                centering_master.centering_s_gst_percent,
                centering_master.centering_s_gst_amount,
                centering_master.centering_c_gst_percent,
                centering_master.centering_c_gst_amount,
                centering_master.centering_i_gst_percent,
                centering_master.centering_i_gst_amount,
            ]
        );

        // Centering Id
        const CenteringId = CenteringData.rows[0].centering_id;

        // Centring Items
        for (let CenteringItem of centering_master.centering_items)
        {

            await pool.query(
                `
                    INSERT INTO centering_items
                        (centering_id, centering_item_name, centering_item_amount, centering_item_remarks)
                    VALUES 
                        ($1, $2, $3, $4) RETURNING *
                `,
                [
                    CenteringId,
                    centering_master.centering_items.centering_item_name,
                    centering_master.centering_items.centering_item_amount,
                    centering_master.centering_items.centering_item_remarks,
                ]
            );

        }

        // Centering Data ----------------------------------------------------------------------------------------------



        // Plumbing Data -----------------------------------------------------------------------------------------------
        const PlumbingData = await pool.query(

            `
                INSERT INTO plumbing_master
                (
                     labour_id, 
                     plumbing_name, 
                     plumbing_phone,
                     plumbing_address, 
                 
                     plumbing_contract, 
                     plumbing_contract_amount,
                 
                     plumbing_s_gst_percent, 
                     plumbing_s_gst_amount, 
                     plumbing_c_gst_percent, 
                     plumbing_c_gst_amount, 
                     plumbing_i_gst_percent, 
                     plumbing_i_gst_amount
            
                 ) 
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
                
            `,
            [
                LabourId,
                plumbing_master.plumbing_name,
                plumbing_master.plumbing_phone,
                plumbing_master.plumbing_address,

                plumbing_master.plumbing_contract,
                plumbing_master.plumbing_contract_amount,

                plumbing_master.plumbing_s_gst_percent,
                plumbing_master.plumbing_s_gst_amount,
                plumbing_master.plumbing_c_gst_percent,
                plumbing_master.plumbing_c_gst_amount,
                plumbing_master.plumbing_i_gst_percent,
                plumbing_master.plumbing_i_gst_amount,
            ]

        );

        // Plumbing Id
        const PlumbingId = PlumbingData.rows[0].plumbing_id;

        // Plumbing Items
        for (let PlumbingItem of plumbing_master.plumbing_items)
        {

            await pool.query(
                `
                    INSERT INTO plumbing_items
                        (plumbing_id, item_name, item_amount, item_remarks)
                    VALUES 
                        ($1, $2, $3, $4) RETURNING *
                `,
                [
                    PlumbingId,
                    PlumbingItem.plumbing_item_name,
                    PlumbingItem.plumbing_item_amount,
                    PlumbingItem.plumbing_item_remarks,
                ]

            );

        }

        // Plumbing Data -----------------------------------------------------------------------------------------------



        // Electrical Data ---------------------------------------------------------------------------------------------
        const ElectricalData = await pool.query(
            `
                INSERT INTO electrical_master
                    (
                        labour_id, 

                        electrical_name, 
                        electrical_phone, 
                        electrical_address, 
                     
                        electrical_contract, 
                        electrical_contract_amount, 
                     
                        electrical_s_gst_percent, 
                        electrical_s_gst_amount, 
                        electrical_c_gst_percent, 
                        electrical_c_gst_amount, 
                        electrical_i_gst_percent, 
                        electrical_i_gst_amount
                     
                    
                    ) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
            `,
            [
                LabourId,
                electrical_master.electrical_name,
                electrical_master.electrical_phone,
                electrical_master.electrical_address,

                electrical_master.electrical_contract,
                electrical_master.electrical_contract_amount,

                electrical_master.electrical_s_gst_percent,
                electrical_master.electrical_s_gst_amount,
                electrical_master.electrical_c_gst_percent,
                electrical_master.electrical_c_gst_amount,
                electrical_master.electrical_i_gst_percent,
                electrical_master.electrical_i_gst_amount,
            ]
        );

        // Electrical Id
        const ElectricalId = ElectricalData.rows[0].electrical_id;

        // Electrical Items
        for (let ElectricalItem of electrical_master.electrical_items)
        {

            await pool.query(
                `
                    INSERT INTO electrical_items
                        (electrical_id, item_name, item_amount, item_remarks)
                    VALUES 
                        ($1, $2, $3, $4) RETURNING *
                `,
                [
                    ElectricalId,
                    ElectricalItem.electrical_item_name,
                    ElectricalItem.electrical_item_amount,
                    ElectricalItem.electrical_item_remarks,
                ]
            );

        }

        // Electrical Data ---------------------------------------------------------------------------------------------



        // Tiles Data --------------------------------------------------------------------------------------------------
        const TilesData = await pool.query(
            `
                INSERT INTO tiles_master
                    (
                        labour_id, 
                        tiles_name, 
                        tiles_phone, 
                        tiles_address, 
                     
                        tiles_contract, 
                        tiles_contract_amount, 
                     
                        tiles_s_gst_percent, 
                        tiles_s_gst_amount, 
                        tiles_c_gst_percent, 
                        tiles_c_gst_amount, 
                        tiles_i_gst_percent, 
                        tiles_i_gst_amount
     
                    ) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
            `,
            [
                LabourId,
                tiles_master.tiles_name,
                tiles_master.tiles_phone,
                tiles_master.tiles_address,

                tiles_master.tiles_contract,
                tiles_master.tiles_contract_amount,

                tiles_master.tiles_s_gst_percent,
                tiles_master.tiles_s_gst_amount,
                tiles_master.tiles_c_gst_percent,
                tiles_master.tiles_c_gst_amount,
                tiles_master.tiles_i_gst_percent,
                tiles_master.tiles_i_gst_amount,
            ]
        );

        // Tiles Id
        const TilesId = TilesData.rows[0].tiles_id;

        // Tiles Items
        for (let TilesItem of tiles_master.tiles_items)
        {

            await pool.query(
                `
                    INSERT INTO tiles_items
                        (tiles_id, item_name, item_amount, item_remarks)
                    VALUES 
                        ($1, $2, $3, $4) RETURNING *
                `,
                [
                    TilesId,
                    TilesItem.tiles_item_name,
                    TilesItem.tiles_item_amount,
                    TilesItem.tiles_item_remarks,
                ]
            );

        }

        // Tiles Data --------------------------------------------------------------------------------------------------



        // Carpenter Data ----------------------------------------------------------------------------------------------
        const CarpenterData = await pool.query(
            `
                INSERT INTO carpenter_master
                    (
                        labour_id, 
                        carpenter_name, 
                        carpenter_phone, 
                        carpenter_address, 
                     
                        carpenter_contract, 
                        carpenter_contract_amount, 
                     
                        carpenter_s_gst_percent, 
                        carpenter_s_gst_amount, 
                        carpenter_c_gst_percent, 
                        carpenter_c_gst_amount, 
                        carpenter_i_gst_percent, 
                        carpenter_i_gst_amount
                    ) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
            `,
            [
                LabourId,
                carpenter_master.carpenter_name,
                carpenter_master.carpenter_phone,
                carpenter_master.carpenter_address,

                carpenter_master.carpenter_contract,
                carpenter_master.carpenter_contract_amount,

                carpenter_master.carpenter_s_gst_percent,
                carpenter_master.carpenter_s_gst_amount,
                carpenter_master.carpenter_c_gst_percent,
                carpenter_master.carpenter_c_gst_amount,
                carpenter_master.carpenter_i_gst_percent,
                carpenter_master.carpenter_i_gst_amount,
            ]
        );

        // Carpenter Id
        const CarpenterId = CarpenterData.rows[0].carpenter_id;

        // Carpenter Items
        for (let CarpenterItem of carpenter_master.carpenter_items)
        {

            await pool.query(
                `
                    INSERT INTO carpenter_items
                        (carpenter_id, item_name, item_amount, item_remarks)
                    VALUES 
                        ($1, $2, $3, $4) RETURNING *
                `,
                [
                    CarpenterId,
                    CarpenterItem.carpenter_item_name,
                    CarpenterItem.carpenter_item_amount,
                    CarpenterItem.carpenter_item_remarks,
                ]
            );

        }

        // Carpenter Data ----------------------------------------------------------------------------------------------



        // Painter Data ------------------------------------------------------------------------------------------------
        const PainterData = await pool.query(
            `INSERT INTO painter_master(labour_id, painter_name, painter_phone, painter_address, painter_contract, painter_contract_amount, painter_s_gst_percent, painter_s_gst_amount, painter_c_gst_percent, painter_c_gst_amount, painter_i_gst_percent, painter_i_gst_amount)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [
                LabourId,
                painter_master.painter_name,
                painter_master.painter_phone,
                painter_master.painter_address,

                painter_master.painter_contract,
                painter_master.painter_contract_amount,

                painter_master.painter_s_gst_percent,
                painter_master.painter_s_gst_amount,
                painter_master.painter_c_gst_percent,
                painter_master.painter_c_gst_amount,
                painter_master.painter_i_gst_percent,
                painter_master.painter_i_gst_amount,
            ]
        );

        // Painter Id
        const PainterId = PainterData.rows[0].painter_id;

        // Painter Items
        for (let PainterItem of painter_master.painter_items)
        {

            await pool.query(
                `
                    INSERT INTO painter_items
                        (painter_id, item_name, item_amount, item_remarks)
                    VALUES 
                        ($1, $2, $3, $4) RETURNING *
                `,
                [
                    PainterId,
                    PainterItem.painter_item_name,
                    PainterItem.painter_item_amount,
                    PainterItem.painter_item_remarks,
                ]
            );

        }

        // Painter Data ------------------------------------------------------------------------------------------------



        // Other Data --------------------------------------------------------------------------------------------------
        const OtherData = await pool.query(
            `
                INSERT INTO other_master
                    (
                        labour_id, 
                        other_name, 
                        other_phone, 
                        other_address, 
                     
                        other_contract, 
                        other_contract_amount, 
                     
                        other_s_gst_percent, 
                        other_s_gst_amount, 
                        other_c_gst_percent, 
                        other_c_gst_amount, 
                        other_i_gst_percent, 
                        other_i_gst_amount
                    ) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
            `,
            [
                LabourId,
                other_master.other_name,
                other_master.other_phone,
                other_master.other_address,

                other_master.other_contract,
                other_master.other_contract_amount,

                other_master.other_s_gst_percent,
                other_master.other_s_gst_amount,
                other_master.other_c_gst_percent,
                other_master.other_c_gst_amount,
                other_master.other_i_gst_percent,
                other_master.other_i_gst_amount,
            ]
        );

        // Other Id
        const OtherId = OtherData.rows[0].other_id;

        // Other Items
        for (let OtherItem of other_master.other_items)
        {

            await pool.query(
                `
                    INSERT INTO other_items
                        (other_id, item_name, item_amount, item_remarks)
                    VALUES 
                        ($1, $2, $3, $4) RETURNING *
                `,
                [
                    OtherId,
                    OtherItem.other_item_name,
                    OtherItem.other_item_amount,
                    OtherItem.other_item_remarks,

                ]
            );

        }

        // Other Data --------------------------------------------------------------------------------------------------


        res.status(200).json({ msg: `Labour Created for the ${project_name} site` })

    } catch (e) {

        console.error("Error in AddLabour", e);

        res.status(500).json({msg: `Error in Add Labour ${e}`});

    }

};

// fetch labour
const FetchLabourData = async (req, res) => {

    try {

        // Labour Master Render
        const LabourData = await pool.query(
            `
                SELECT * FROM labour_master
            `
        );

        // Mason Master Render
        const MasonData = await pool.query(

            `    
                SELECT * FROM mason_master
            `
        );

        // Mason Items
        const MasonItemData = await pool.query(

            `
                SELECT * FROM mason_items 
            `
        );


        // Centering Master Render
        const CenteringData = await pool.query(

            `    
                SELECT * FROM centering_master
            `
        );

        // Centering Items
        const CenteringItemData = await pool.query(

            `
            SELECT * FROM centering_items
            `
        );

        // Plumbing Master Render
        const PlumbingData = await pool.query(

            `    
                SELECT * FROM plumbing_master
            `
        );

        // Plumbing Items
        const PlumbingItemData = await pool.query(
            `
            SELECT * FROM plumbing_items
            
            `
        );

        // Electrical Master Render
        const ElectricalData = await pool.query(

            `    
                SELECT * FROM electrical_master 
            `
        );

        // Electrical Items
        const ElectricalItemData = await pool.query(

            `
            SELECT * FROM electrical_items
            `
        );

        // Tiles Master Render
        const TilesData = await pool.query(

            `    
                SELECT * FROM tiles_master
            `
        );

        // Tiles Items
        const TilesItemData = await pool.query(

            `
            SELECT * FROM tiles_items
            `
        );

        // Carpenter Master Render
        const CarpenterData = await pool.query(

            `    
                SELECT * FROM carpenter_master
            `
        );

        // Carpenter Items
        const CarpenterItemData = await pool.query(

            `
            SELECT * FROM carpenter_items
            `
        );

        // Painter Master Render
        const PainterData = await pool.query(

            `    
                SELECT * FROM painter_master
            `
        );


        // Painter Items
        const PainterItemData = await pool.query(

            `
            SELECT * FROM  painter_items 
            `
        );

        //  Other Labour Master Render
        const OtherData = await pool.query(

            `    
                SELECT * FROM other_master
            `
        );

        // Other Labour Items
        const OtherLabourItemsData = await pool.query(

            `
            SELECT * FROM other_items
            `
        );




        // 🧩 Helper: attach items to a master record
        const attachItems = (master, items, idField) => {
            if (!master) return null;
            console.log("Master ID:", master[idField]);
            console.log("Item matches:", items.filter(item => item[idField] === master[idField]));

            return {
                ...master,
                items: (Array.isArray(items) ? items : []).filter(item => item[idField] === master[idField]),

            };
        };

        console.log(MasonItemData.rows);

        // 🔗 Combine data with nested structure
        const combinedData = {
            labour: LabourData.rows.map(labour => {
                // Find matching master record for this labour_id
                const masonMaster = MasonData.rows.find(m => m.labour_id === labour.labour_id);
                const centeringMaster = CenteringData.rows.find(c => c.labour_id === labour.labour_id);
                const plumbingMaster = PlumbingData.rows.find(p => p.labour_id === labour.labour_id);
                const electricalMaster = ElectricalData.rows.find(e => e.labour_id === labour.labour_id);
                const tilesMaster = TilesData.rows.find(t => t.labour_id === labour.labour_id);
                const carpenterMaster = CarpenterData.rows.find(ca => ca.labour_id === labour.labour_id);
                const painterMaster = PainterData.rows.find(pa => pa.labour_id === labour.labour_id);
                const otherMaster = OtherData.rows.find(o => o.labour_id === labour.labour_id);

                return {
                    ...labour,
                    MasonMaster: attachItems(masonMaster, MasonItemData.rows, "mason_id"),
                    CenteringMaster: attachItems(centeringMaster, CenteringItemData.rows, "centering_id"),
                    PlumbingMaster: attachItems(plumbingMaster, PlumbingItemData.rows, "plumbing_id"),
                    ElectricalMaster: attachItems(electricalMaster, ElectricalItemData.rows, "electrical_id"),
                    TilesMaster: attachItems(tilesMaster, TilesItemData.rows, "tiles_id"),
                    CarpenterMaster: attachItems(carpenterMaster, CarpenterItemData.rows, "carpenter_id"),
                    PainterMaster: attachItems(painterMaster, PainterItemData.rows, "painter_id"),
                    OtherMaster: attachItems(otherMaster, OtherLabourItemsData.rows, "other_id"),
                };
            })
        };

        res.status(200).json({ LabourData: combinedData });



    } catch (error) {

        res.status(500).json({msg: `Error in FetchLabour: ${error}`});

    }

};



// Delete Labour
const DeleteLabour = async (req, res) => {

    try{
        const { id } = req.params;
        await pool.query(

            "DELETE FROM labour_master WHERE labour_id = $1",
            [id]

        );

        res.status(200).json({ msg: "Labour deleted successfully" });

    } catch(e){

        console.error("Error Deleting labour Details",e);

        res.status(500).json({msg: " Failed to Delete labour Details" });


    }

};





// Export Modules
export {
    AddLabour,
    FetchLabourData,
    DeleteLabour
};