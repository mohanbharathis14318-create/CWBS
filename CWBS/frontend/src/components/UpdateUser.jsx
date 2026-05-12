import toast from "react-hot-toast";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CircleArrowLeft, UserPen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Import Hooks
import { useUser } from "../Hooks/useUser.js";

// Import Components
import Loader from "./Loader.jsx";
import Loading_Screen from "./Loading_Screen.jsx";

const UpdateUser = () => {

    // Property and States
    const { getUserById, updateUser, loading } = useUser();

    const [ Redirecting, setRedirecting ] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    console.log(id);

    // State for Getting Input values
    const [ formData, setFormData ] = useState({
        user_name: "",
        email: "",
        phone: "",
        user_password: "",
        confirm_password: "",
        user_designation: "",
    });

    useEffect(() => {

        const fetchData = async () => {

            const res = await getUserById(id);

            if (res && res.userData && res.userData.length > 0) {

                const user = res.userData[0];

                setFormData({
                    user_name: user.full_name || "",
                    email: user.user_email || "",
                    phone: user.phone || "",
                    user_designation: user.user_designation || "",
                    user_password: "",
                    confirm_password: "",
                });

            }

        }

        fetchData();

    }, [getUserById, id]);

    // Handle Register
    const handleSubmit = async (ev) => {

        ev.preventDefault();

        // Checking the Password matches or not, then create a user
        if (formData.user_password !== formData.confirm_password)
        {

            toast.error("Passwords don't match", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });


        } else {

            const update_success = await updateUser({
                id,
                user_name: formData.user_name,
                user_password: formData.user_password,
                user_email: formData.email,
                user_phone: formData.phone,
                user_designation: formData.user_designation,
            });

            if (update_success)
            {

                setRedirecting(true);

                setTimeout(() => {

                    navigate("/app-area/user-management");

                }, 2000);

            }

        }

    };

    if (Redirecting) return <Loading_Screen />;


    return (
        <div>
            <div>
                <div className="grid gap-4 md:flex md:justify-between lg:flex lg:justify-between xl:justify-between items-center">
                    <motion.p className="head text-5xl"
                              initial={{ opacity: 0, y: 100 }}
                              animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        Make Changes by People
                    </motion.p>
                    <motion.button initial={{ opacity: 0, y: 100 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   transition={{delay: 0.7 }}
                                   onClick={() => navigate("/app-area/user-management")}
                                   className="flex gap-2 justify-center items-center text-[#005BEA]  text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                        <CircleArrowLeft />
                        Back
                    </motion.button>
                </div>
                <motion.hr initial={{ y: 100, z: 1000, opacity: 0 }}
                           animate={{ y: 0, z: 0, opacity: 1 }}
                           className="border-b-0 border-[#707070] my-2" />
                <motion.p className="head text-2xl"
                          initial={{ opacity: 0, y: 100 }}
                          transition={{ delay: 0.4 }}
                          animate={{ y: 0, opacity: 1 }}>

                    Update User Account Details
                </motion.p>
            </div>
            <div className="create grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                <div className="create my-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-22 text-[#202020]">
                        <div className="grid gap-10">
                            <motion.label initial={{ opacity: 0, y: 100 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.1 }}
                                          className="grid" htmlFor="name">
                                <span className="mx-2">Full Name</span>
                                <input type="text"
                                       value={formData.user_name}
                                       onChange={(ev) => { setFormData({ ...formData, user_name: ev.target.value }) }}
                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                       placeholder="Enter Your Name"
                                       aria-required="true"/>
                            </motion.label>
                            <motion.label initial={{ opacity: 0, y: 100 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.2 }}
                                          className="grid" htmlFor="phone">
                                <span className="mx-2">Phone</span>
                                <input type="tel"
                                       value={formData.phone}
                                       onChange={(ev) => { setFormData({ ...formData, user_phone: ev.target.value }) }}
                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                       placeholder="Enter Your Phone" aria-required="true"/>
                            </motion.label>
                            <motion.label initial={{ opacity: 0, y: 100 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.3 }}
                                          className="grid" htmlFor="Email">
                                <span className="mx-2">Email</span>
                                <input type="email"
                                       value={formData.email}
                                       onChange={(ev) => { setFormData({ ...formData, user_email: ev.target.value }) }}
                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                       placeholder="Enter Your Email" aria-required="true"/>
                            </motion.label>
                        </div>
                        <div className="grid gap-10">
                            <motion.label initial={{ opacity: 0, y: 100 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.4 }}
                                          className="grid" htmlFor="password">
                                <span className="mx-2">Password</span>
                                <input type="password"
                                       value={formData.password}
                                       onChange={(ev) => { setFormData({ ...formData, user_password: ev.target.value }) }}
                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                       placeholder="Enter Your Name"/>
                            </motion.label>
                            <motion.label initial={{ opacity: 0, y: 100 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.5 }}
                                          className="grid" htmlFor="confirm password">
                                <span className="mx-2">Confirm Password</span>
                                <input type="password"
                                       value={formData.confirm_password}
                                       onChange={(ev) => { setFormData({ ...formData, confirm_password: ev.target.value } ) }}
                                       className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                       placeholder="Enter Your Confirm Password" aria-required="true"/>
                            </motion.label>
                            <motion.label initial={{ opacity: 0, y: 100 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.6 }}
                                          className="grid" htmlFor="designation">
                                <span className="mx-2">Designation</span>
                                <select name="designation"
                                        value={formData.user_designation}
                                        onChange={(ev) => { setFormData({ ...formData, user_designation: ev.target.value }) }}
                                        className="outline outline-[#BABABA] focus:outline-2 focus:outline-[#005bea] rounded p-4"
                                        id="role" placeholder="Select Your Designation">
                                    <option value="">
                                        Select Your Designation
                                    </option>
                                    <option value="MD">MD</option>
                                    <option value="Accountant">Accountant</option>
                                    <option value="Site Supervisor">Site Supervisor</option>
                                    <option value="Other Individuals">Other Individuals</option>
                                </select>
                            </motion.label>
                        </div>
                        <div className="grid gap-6">
                            <motion.button initial={{ opacity:0, y: 100 }}
                                           animate={{ opacity: 1, y: 0 }}
                                           transition={{ delay: 0.1 }}
                                           type="submit"
                                           disabled={loading}
                                           className="text-[#005bea] border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] rounded p-4">

                                { loading ? (

                                    <Loader />

                                ) : (
                                    <span className="flex gap-2 justify-center items-center">
                                            <UserPen />
                                            Update Account
                                        </span>
                                ) }

                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;