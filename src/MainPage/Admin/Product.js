import Menu from "./Menu"
import { Link } from "react-router-dom"
import "../../asset/css/admin.css"
import { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment/moment"
import { ToastContainer, toast } from "react-toastify"

const Product = () => {
    const url = "http://vcb-api.somee.com/api/Product/";
    const url_category = "http://vcb-api.somee.com/api/Category/";
    const url_order = "http://vcb-api.somee.com/api/OrderSlip/";

    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');

    const handleShow = () => { setShow(true) };
    const handleClose = () => { setShow(false) };

    const [category, setCategory] = useState('');

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const response = await axios.get(url)
            .catch((error) => {
                toast.error(error.message);
            })
        setData(response.data);
        const response_category = await axios.get(url_category)
            .catch((error) => {
                toast.error(error.message);
            })
        setDataCategory(response_category.data);
    }

    async function handleAddCategory() {
        const data = {
            "CategoryID": 0,
            "CategoryName": category
        }
        await axios.post(url_category, data)
            .then((result) => {
                toast.success(`Danh mục ${data.CategoryName} đã được thêm thành công.`);
                getData();
            })
            .catch((error) => {
                toast.error(error.message);
            })
        handleClose();
    }

    async function handleDeleteCategory(name, id) {
        if (window.confirm(`Bạn có muốn xóa danh mục ${name} không?`) == true) {
            await axios.delete(url_category + id)
                .then((result) => {
                    toast.success(`Xóa danh mục ${name} thành công.`);
                    getData();
                })
            handleClose();
        }
        else {
            toast.warning("Oops! Không có gì thay đổi.");
        }
    }

    async function handleDeleteProduct(name, id) {
        if (window.confirm(`Bạn có muốn xóa sản phẩm ${name} không?`) == true) {
            const response = await axios.get(url_order + `Products/${id}`)
            .catch((error) => {
                toast.error(error.message);
            })
            for(var i = 0; i < response.data.length; i++)
            {
                await axios.delete(url_order + response.data[i].OrderId)
                .catch((error) => {
                    toast.error(error.message);
                })
            }

            await axios.delete(url + id)
                .then((result) => {
                    toast.success(`Xóa sản phẩm ${name} thành công.`);
                    getData();
                })
                .catch((error) => {
                    toast.error(error.message);
                })
        }
        else {
            toast.warning("Oops! Không có gì thay đổi.");
        }
    }

    async function handleChecked(e) {
        setSelected((prev) => (e === prev ? null : e))
        if (!event.target.checked) {
            getData();
        }
        else {
            await axios.get(url + `Category/${event.target.value}`)
                .then((result) => {
                    setData(result.data);
                })
                .catch((error) => {
                    toast.error(error.message);
                })
        }
    }

    return (
        <>
            <ToastContainer />
            <nav className="main">
                <Menu />
                <section className="user-section">
                    <div className="page-relate">
                        <ul className="navbar">
                            <li><Link to={"/product"}>Sản phẩm</Link></li>
                        </ul>
                    </div>

                    <div className="board">
                        <div className="title">
                            <h3>Danh sách sản phẩm</h3>
                        </div>

                        <div className="options">
                            <div className="search-bar">
                                <input type="text" id="search" onChange={(e) => { setSearch(e.target.value) }} placeholder="Tìm kiếm theo tên sản phẩm" />
                            </div>

                            <div className="button">
                                <button type="button"><i className='bx bxs-cog' ></i></button>
                                <Link to={"/product/productForm"}><button type="button" className="add-btn">Thêm mới</button></Link>
                            </div>
                        </div>

                        <div className="options">
                            <div className="categories-filter">
                                {
                                    dataCategory && dataCategory.length > 0 ?
                                        dataCategory.map((item, index) => {
                                            return (
                                                <div className="category" key={index}>
                                                    <input type="checkbox" id="all" name="all" checked={index === selected} value={item.CategoryID} onChange={() => handleChecked(index)} />
                                                    <label className="checkbox" htmlFor="all">{item.CategoryName} &nbsp;</label>
                                                    {
                                                        show ?
                                                            (<span onClick={() => handleDeleteCategory(item.CategoryName, item.CategoryID)}>Xóa</span>)
                                                            :
                                                            ("")
                                                    }
                                                </div>
                                            )
                                        })
                                        :
                                        "Loading..."
                                }
                            </div>

                            <div className="add-category">
                                {
                                    !show ?
                                        (<Link onClick={handleShow}>Thêm danh mục</Link>)
                                        :
                                        (<div className="add-input">
                                            <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Nhập" />
                                            <button type="button" onClick={handleAddCategory}>Lưu</button>
                                            <button type="button" onClick={handleClose}>Hủy</button>
                                        </div>)
                                }


                            </div>
                        </div>
                    </div>

                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "20%" }}>Tên sản phẩm</th>
                                    <th style={{ width: "10%" }}>Kích thước</th>
                                    <th style={{ width: "10%" }}>Chất liệu</th>
                                    <th style={{ width: "10%" }}>Giá</th>
                                    <th style={{ width: "15%" }}>Số lượng</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày cập nhật</th>
                                    <th style={{ width: "5%" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ?
                                    data.filter((d) =>
                                        d.ProductName.toLowerCase().includes(search.toLowerCase()) ||
                                        d.Dimension.toLowerCase().includes(search.toLowerCase()) ||
                                        d.Material.toLowerCase().includes(search.toLowerCase())
                                    ).map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.ProductName}</td>
                                                <td>{item.Dimension}</td>
                                                <td>{item.Material}</td>
                                                <td>{item.Price === 0 ? "Liên hệ" : `${item.price}đ`}</td>
                                                <td>{item.Quantity}</td>
                                                <td>
                                                    {moment(item.CreatedDate).format("DD-MM-YYYY")} <br />
                                                    <span className="time">Lúc {moment(item.CreatedDate).format("HH:mm:ss")}</span>
                                                </td>
                                                {
                                                    item.UpdatedDate ?
                                                        (
                                                            <td>
                                                                {moment(item.UpdatedDate).format("DD-MM-YYYY")} <br />
                                                                <span className="time">Lúc {moment(item.UpdatedDate).format("HH:mm:ss")}</span>
                                                            </td>
                                                        )
                                                        :
                                                        (<td></td>)
                                                }
                                                <td colSpan={2}>
                                                    <Link to={`/product/editProductForm/${item.ProductID}`}><button type="button" className="edit-btn"><i className='bx bxs-edit-alt' ></i></button></Link>
                                                    <button type="button" className="delete-btn" onClick={() => handleDeleteProduct(item.ProductName, item.ProductID)}><i className='bx bxs-trash' ></i></button>
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

export default Product