import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const Home = () => {
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.post(
                    "api/",
                    {},
                    { withCredentials: true }
                );

                if (response && response.data) {
                    const { status, user } = response.data;
                    setUsername(user)

                    if (status) {
                        // Check if the user has already been greeted
                        const greeted = localStorage.getItem('greeted');
                        if (!greeted) {
                            toast(`Hello ${user}`, { position: "top-right" });
                            // Set the greeted flag in local storage
                            localStorage.setItem('greeted', 'true');
                        }
                    } else {
                        console.error(error)
                        removeCookie("token");
                        navigate('/login');
                    }
                }
            } catch (error) {
                console.error("Error verifying cookie:", error);
                removeCookie("token");
                navigate('/login'); ``
            }
        };

        verifyCookie();
    }, [cookies, navigate, removeCookie,]);

    const Logout = () => {
        removeCookie("token");
        navigate("/signup");
    };

    return (
        <>
            <div className="home_page">
                <h4>
                    {" "}
                    Welcome <span>{username}</span>
                </h4>
                <button>Courses</button>
                <button ><Link to="/courses">Show All</Link></button>
                <button>Registered Courses</button>


                <button><Link to="/students">Students</Link></button>
                <button onClick={Logout}>LOGOUT</button>
            </div>
            <ToastContainer limit={1} />
        </>
    );
}
export default Home