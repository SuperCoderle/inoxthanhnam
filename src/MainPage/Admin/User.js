import Menu from "./Menu"
import { Link } from "react-router-dom"
import "../../asset/css/admin.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function User() {
    const url = "http://vcb-api.somee.com/api/UserInformation/";

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const response = await axios.get(url)
            .catch((error) => {
                toast.error(error.message);
            })
        setData(response.data);
    }

    async function handleDeleteUser(name, id) {
        if(window.confirm(`Bạn có muốn xóa tài khoản ${name} không?`) == true)
        {
            await axios.delete(url + id)
            .then((result) => {
                toast.success(`Xóa tài khoản ${name} thành công.`);
                getData();
            })
            .catch((error) => {
                toast.error(error.message);
            })
        }
        else
        {
            toast.warning("Oops! Không có gì thay đổi.");
        }
    }

    return (
        <>
            <ToastContainer/>
            <nav className="main">
                <Menu />
                <section className="user-section">
                    <div className="page-relate">
                        <ul className="navbar">
                            <li><Link to={"/user"}>Tài khoản</Link></li>
                        </ul>
                    </div>

                    <div className="board">
                        <div className="title">
                            <h3>Danh sách tài khoản</h3>
                        </div>

                        <div className="options">
                            <div className="search-bar">
                                <input type="text" id="search" placeholder="Tìm kiếm" />
                            </div>

                            <div className="button">
                                <button type="button"><i className='bx bxs-cog' ></i></button>
                                <button type="button" className="add-btn">Thêm mới</button>
                            </div>
                        </div>
                    </div>

                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "25%" }}>Tên tài khoản</th>
                                    <th style={{ width: "25%" }}>Mật khẩu</th>
                                    <th style={{ width: "15%" }}>Trạng thái</th>
                                    <th style={{ width: "5%" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.length > 0 ?
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.Username}</td>
                                                    <td>{item.Password}</td>
                                                    <td>{item.IsActive}</td>
                                                    <td colSpan={2}>
                                                        <button type="button" className="edit-btn"><i className='bx bxs-edit-alt' ></i></button>
                                                        <button type="button" className="delete-btn" onClick={() => handleDeleteUser(item.Username, item.UserId)}><i className='bx bxs-trash' ></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        "Loading..."
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </nav>
        </>
    )
}

export default User