import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

const HomeLayout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking user logged in or not
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    // for dispaying the options, according to user role
    const role = useSelector((state) => state?.auth?.role);

    // function to handle logout
    const handleLogout = async (event) => {
        event.preventDefault();

        // calling logout action
        const res = await dispatch(logout());

        // redirect to home page if true
        if (res?.payload?.success) navigate("/");
    };

    // open side bar
    const openDrawer = () => {
        const drawerSide = document.getElementsByClassName("drawer-overlay");
        drawerSide[0].style.width = "auto";
    };
    // hide side bar
    const hideDrawer = () => {
        const drawerToggle = document.getElementsByClassName("drawer-toggle");
        drawerToggle[0].checked = false;
        const drawerSide = document.getElementsByClassName("drawer-overlay");
        drawerSide[0].style.width = 0;
    };
    return (
        <>
            <div className="min-h-[90vh]">
                <div className="drawer absolute left-0 z-50 w-fit">
                    <input type="checkbox" id="my-drawer" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer" className="cursor-pointer relative">
                            <FiMenu
                                onClick={openDrawer}
                                size={"32px"}
                                className="font-bold text-white m-4"
                            />
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-48 sm:w-80 bg-base-200 h-full text-base-content relative">
                            <li className="w-fit absolute right-2 z-50">
                                <button onClick={hideDrawer}>
                                    <AiFillCloseCircle
                                        size={24}
                                    />
                                </button>
                            </li>
                            <li>
                                <Link to={"/"}>Home</Link>
                            </li>
                            {/* displaying dashboard, if user is logged in */}
                            {isLoggedIn && role === "ADMIN" && (
                                <li>
                                    <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                                </li>
                            )}
                            <li>
                                <Link to={"/courses"}>All Courses</Link>
                            </li>
                            <li>
                                <Link to={"/contact"}>Contact Us</Link>
                            </li>
                            <li>
                                <Link to={"/about"}>About Us</Link>
                            </li>
                            {/* creating the bottom part of drawer */}
                            {/* if user is not logged in */}
                            {!isLoggedIn && (
                                <li className="absolute bottom-4 w-[90%]">
                                    <div className="w-full flex items-center justify-center">
                                        <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                            <Link to={"/login"}>Login</Link>
                                        </button>
                                        <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                            <Link to={"/signup"}>Signup</Link>
                                        </button>
                                    </div>
                                </li>
                            )}

                            {/* if user is logged in */}
                            {isLoggedIn && (
                                <li className="absolute bottom-4 w-[90%]">
                                    <div className="w-full flex items-center justify-center">
                                        <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                            <Link to={"/user/profile"}>Profile</Link>
                                        </button>
                                        <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                            <Link onClick={handleLogout}>Logout</Link>
                                        </button>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                {children}
                <Footer />
            </div>
        </>
    );
};

export default HomeLayout;