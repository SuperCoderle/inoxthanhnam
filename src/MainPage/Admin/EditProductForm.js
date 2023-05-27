import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

function EditProductForm() {
    const url = "http://vcb-api.somee.com/api/Product/";
    const url_category = "http://vcb-api.somee.com/api/Category/";
    const url_pictures = "http://vcb-api.somee.com/api/PictureList/";
    const navigate = useNavigate();

    const [category, setCategory] = useState([]);
    const [pictureList, setPictureList] = useState([]);

    const params = useParams();
    const [productName, setProductName] = useState('');
    const [dimension, setDimension] = useState('');
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [createdDate, setCreatedDate] = useState('');
    const [picture, setPicture] = useState('');
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        await axios.get(url + params.ProductID)
            .then((result) => {
                setProductName(result.data[0].ProductName);
                setDimension(result.data[0].Dimension);
                setMaterial(result.data[0].Material);
                setPrice(result.data[0].Price);
                setCategoryId(result.data[0].CategoryId);
                setCreatedDate(result.data[0].CreatedDate);
                setPicture(result.data[0].Picture);
                setQuantity(result.data[0].Quantity);
            })
            .catch((error) => {
                toast.error(error.message);
            })
        await axios.get(url_category)
            .then((result) => {
                setCategory(result.data);
            })
            .catch((error) => {
                toast.error(error.message);
            })
        await axios.get(url_pictures + `Products/${params.ProductID}`)
            .then((result) => {
                setPictureList(result.data);
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    async function handleUpdate() {
        const data = {
            "ProductId": params.ProductID,
            "ProductName": productName,
            "Dimension": dimension,
            "Material": material,
            "Price": price,
            "CategoryID": parseInt(categoryId),
            "CreatedDate": createdDate,
            "UpdatedDate": moment(new Date()).format("MM-DD-YYYY HH:mm:ss"),
            "Picture": picture,
            "Quantity": quantity
        }

        await axios.put(url, data)
            .then((result) => {
                toast.success("Cập nhật thành công.");
                if (window.confirm("Bạn có muốn quay lại không?") == true) {
                    navigate("/product");
                }
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

    async function handleUploadMore(e) {
        handleUpload(e);
        const data = {
            "PictureListId": 0,
            "ProductId": params.ProductID,
            "Picture": e.target.files[0].name
        }

        await axios.post(url_pictures, data)
        .then((result) => {
            getData();
        })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    async function handleDeleteImage(id)
    {
        await axios.delete(url_pictures + id)
        .then((result) => {
            getData();
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
                            <li><Link to={`/product/editProductForm/${params.ProductID}`}>Sửa sản phẩm</Link></li>
                        </ul>
                    </div>

                    <div className="board">
                        <div className="title">
                            <h3>Sửa sản phẩm</h3>
                        </div>
                    </div>

                    <form className="form-style">
                        <ul>
                            <li>
                                <input type="text" className="field-style field-split align-left" placeholder="Tên sản phẩm" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                                <input type="text" className="field-style field-split align-right" placeholder="Kích thước" value={dimension} onChange={(e) => setDimension(e.target.value)} required />

                            </li>
                            <li>
                                <input type="text" className="field-style field-split align-left" placeholder="Chất liệu" value={material} onChange={(e) => setMaterial(e.target.value)} required />
                                <input type="number" className="field-style field-split align-right" placeholder="Giá" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </li>
                            <li>
                                <select className="category-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
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
                                <input type="number" className="field-style field-split align-left" placeholder="Chất liệu" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                            </li>
                            <li>
                                <button type="button" onClick={handleUpdate}>Hoàn tất</button>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <img src={`http://vcb-api.somee.com/Photos/Products/${picture}/image.png`} alt="" />
                            </li>
                        </ul>
                    </form>

                    <div className="lasted">
                        <h4>Hình ảnh liên quan</h4>
                        <div className="lasted-content">
                            <ul className="lasted-image">
                                {
                                    pictureList && pictureList.length > 0 ?
                                        pictureList.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <button type="button" onClick={() => handleDeleteImage(item.PictureListId)} className="btn-delete"><i className='bx bx-message-square-x'></i></button>
                                                    <img src={`http://vcb-api.somee.com/Photos/Products/${item.Picture}/image.png`} alt={item.Picture} />
                                                </li>
                                            )
                                        })
                                        :
                                        "Loading..."
                                }
                            </ul>
                            <input type="file" className="field-style field-split align-right" onChange={handleUploadMore} required />
                        </div>
                    </div>
                </section>
            </nav >
        </>
    )
}

export default EditProductForm