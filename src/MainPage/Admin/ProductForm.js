import Menu from "./Menu"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

function ProductForm() {

    const url = "http://vcb-api.somee.com/api/Product/";
    const url_category = "http://vcb-api.somee.com/api/Category/";

    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);

    const [productName, setProductName] = useState('');
    const [dimension, setDimension] = useState('');
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [picture, setPicture] = useState('');
    const [quantity, setQuantity] =useState(0);

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
        setCategory(response_category.data);
    }

    async function handleAddProduct() {
        const data = {
            "ProductID": uuidv4(),
            "ProductName": productName,
            "Dimension": dimension,
            "Material": material,
            "Price": parseFloat(price),
            "CategoryID": parseInt(categoryId),
            "CreatedDate": moment(new Date).format("MM-DD-YYYY HH:mm:ss"),
            "UpdatedDate": "01-01-2000 12:00:00",
            "Picture": picture,
            "Quantity" : quantity
        }

        await axios.post(url, data)
            .then((result) => {
                toast.success(`Sản phẩm ${data.ProductName} được thêm thành công.`);
                getData();
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    async function handleUpload(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);
        await axios.post(url + "UploadImage/", formData)
            .then((result) => {
                setPicture(result.data);
            })
            .catch((error) => {
                toast.error(error.message);
            })
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
                            <span>/</span>
                            <li><Link to={"/product/productForm"}>Thêm sản phẩm</Link></li>
                        </ul>
                    </div>

                    <div className="board">
                        <div className="title">
                            <h3>Thêm sản phẩm mới</h3>
                        </div>
                    </div>

                    <form className="form-style">
                        <ul>
                            <li>
                                <input type="text" className="field-style field-split align-left" placeholder="Tên sản phẩm" onChange={(e) => setProductName(e.target.value)} required />
                                <input type="text" className="field-style field-split align-right" placeholder="Kích thước" onChange={(e) => setDimension(e.target.value)} />

                            </li>
                            <li>
                                <input type="text" className="field-style field-split align-left" placeholder="Chất liệu" onChange={(e) => setMaterial(e.target.value)} required />
                                <input type="number" className="field-style field-split align-right" defaultValue={0} placeholder="Giá" onChange={(e) => setPrice(e.target.value)} required />
                            </li>
                            <li>
                                <select className="category-select" defaultValue={0} onChange={(e) => setCategoryId(e.target.value)}>
                                    <option value={0} disabled hidden>Chọn danh mục</option>
                                    {
                                        category && category.length > 0 ?
                                            category.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.CategoryID}>{item.CategoryName}</option>
                                                )
                                            })
                                            :
                                            "Loading..."
                                    }
                                </select>
                                <input type="file" className="field-style field-split align-right" onChange={handleUpload} required />
                            </li>
                            <li>
                                <input type="number" className="field-style field-split align-left" placeholder="Số lượng" onChange={(e) => setQuantity(e.target.value)} required />
                            </li>
                            <li>
                                <button type="button" onClick={handleAddProduct}>Hoàn tất</button>
                            </li>
                        </ul>
                    </form>

                    <div className="lasted">
                        <h4>Sản phẩm được tạo gần đây</h4>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <p key={index}>
                                            <span>{item.ProductName}</span>
                                            <span className="text-right">{`${moment(item.CreatedDate).format("DD-MM-YYYY")} Lúc: ${moment(item.CreatedDate).format("HH:mm:ss")}`}</span>
                                        </p>
                                    )
                                })
                                :
                                "There is no product was created."
                        }
                    </div>
                </section>
            </nav >
        </>
    )
}

export default ProductForm