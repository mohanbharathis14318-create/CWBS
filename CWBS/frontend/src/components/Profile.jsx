// Import Modules
// import {motion} from "motion/react";
import { NavLink } from "react-router-dom";
import { LayoutGrid, User, LogOut } from 'lucide-react';


// Import Hooks
import { useUser } from "../Hooks/useUser.js";

const Profile = (props) => {

    const { logout } = useUser();

    return (
        <div>
            <section>
                <div className="grid gap-4 md:flex lg:flex xl:flex justify-between items-center py-4">
                    <div className="flex gap-2 text-xl">
                        <div className="flex gap-4 justify-between items-center border border-[#6392E5] bg-[#D9E1EF] rounded">
                            <div className="bg-[#C9D8F3] px-6 py-2 rounded-l">
                                <p className="head">
                                    { props.letter }
                                </p>
                            </div>
                            <p className="mx-4">
                                { props.name }
                            </p>
                        </div>
                        <div className="border border-[#6392E5] bg-[#D9E1EF] p-2 rounded">
                            { props.designation }
                        </div>
                    </div>

                    {/*App Title*/}
                    <div>
                        <p className="head text-[#202020] text-2xl tracking-widest">
                            { props.appTitle }
                        </p>
                    </div>


                    <div className="grid grid-cols-2 gap-4 md:flex lg:flex xl:flex justify-center items-center">
                        <NavLink to="/app-area"
                                 className={({ isActive }) => isActive ? "flex gap-2 items-center text-xl text-[#005BEA] border border-[#6392E5] hover:border-[#6392E5] bg-[#C9D8F3] px-6 py-2 rounded" : "flex gap-2 items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:border-[#6392E5] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                            <LayoutGrid />
                            Apps
                        </NavLink>
                        <NavLink to="/app-area/profile_page"
                                 className={({ isActive }) => isActive ? "flex gap-2 items-center text-xl text-[#005BEA] border border-[#6392E5] hover:border-[#6392E5] bg-[#C9D8F3] px-6 py-2 rounded" : "flex gap-2 items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:border-[#6392E5] hover:bg-[#C9D8F3] px-6 py-2 rounded"}>
                            <User />
                            Profile
                        </NavLink>
                        <button type="submit" onClick={logout}>
                            <div
                                className="flex gap-2 items-center text-xl text-[#005BEA] border border-[#6392E5] bg-[#D9E1EF] hover:border-[#6392E5] hover:bg-[#C9D8F3] px-6 py-2 rounded">
                                <LogOut />
                                Logout
                            </div>
                        </button>
                    </div>
                </div>
                <hr className="border-[#6392E5]"/>
            </section>
        </div>

    );
};

export default Profile;