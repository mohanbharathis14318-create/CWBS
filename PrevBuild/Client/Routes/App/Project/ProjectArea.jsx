// Import Modules
import {NavLink, Routes, Route, Navigate} from "react-router-dom";
import {
    Kanban,
    CirclePlus
} from "lucide-react";

// Import Routes
import CreateNewProject from "./CreateNewProject.jsx";

import ProjectBoard from "./ProjectBoard.jsx";


// Import Component

const ProjectArea = () => {
    return (
        <div>

            <div className="flex gap-2">
                <NavLink to="/app-area/project/project_board"
                         className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                    <Kanban />
                    Project Board
                </NavLink>

                <NavLink to="/app-area/project/create_new_project"
                         className={({ isActive }) => isActive ? "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#C9D8F3] rounded px-6 py-2" : "flex gap-2 justify-center items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                    <CirclePlus />
                    Create New Project
                </NavLink>
            </div>


            <div className="my-4">
                <Routes>
                    <Route index element={<Navigate to="project_board" />} />
                    <Route path="project_board" element={<ProjectBoard />} />
                    <Route path="create_new_project" element={<CreateNewProject />} />
                </Routes>
            </div>

        </div>
    );
};

export default ProjectArea;