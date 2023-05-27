import Footer from "../Header-Footer/Footer"
import Header from "../Header-Footer/Header"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import product from "../../asset/image/TuInoxKinhNho.jpg"
import { v4 as uuidv4 } from 'uuid';


const ProductDetails = () => {
    const url = "http://vcb-api.somee.com/api/Product/";
    const url_category = "http://vcb-api.somee.com/api/Category/";
    const url_order = "http://vcb-api.somee.com/api/OrderSlip/";
    const url_pictures = "http://vcb-api.somee.com/api/PictureList/";

    const params = useParams();
    const [data, setData] = useState({});
    const [list, setList] = useState([]);
    const [dataCategory, setDataCategory] = useState({});
    const [pictureList, setPictureList] = useState([]);

    const [customerName, setCustomerName] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [address, setAddress] = useState('');
    let [quantity, setQuantity] = useState(1);

    const handleIncrease = () => { setQuantity(Number(quantity) + 1) };
    const handleDescrease = () => { Number(quantity) <= 1 ? setQuantity(quantity = 1) : setQuantity(Number(quantity) - 1) };

    const handleChangeImage = (picture) => { data.Picture = picture };

    useEffect(() => {
        getData();
        getList();
    }, []);

    async function getData() {
        const responseData = await axios.get(url + params.ProductID)
            .catch((error) => {
                toast.error(error.message);
            })
        setData(responseData.data[0]);
        await axios.get(url_category + responseData.data[0].CategoryID)
            .then((result) => {
                setDataCategory(result.data[0]);
            })
            .catch((error) => {
                toast.error(error.message);
            })
        await axios.get(url_pictures + `Products/${params.ProductID}`)
            .then((result) => {
                setPictureList(result.data);
            })
            .catch((error) => {
                toast.error((error.message));
            })
    }

    async function getList() {
        await axios.get(url)
            .then((result) => {
                setList(result.data.sort((a, b) => a.CreatedDate - b.CreatedDate).slice(0, 4));
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    const handleLink = (id) => {
        location.replace(`/product/details/${id}`);
    }

    async function handleAddOrderSlip() {
        const orderSlip = {
            "OrderID": uuidv4(),
            "CustomerName": customerName,
            "NumberPhone": numberPhone,
            "Address": address,
            "ProductID": data.ProductID,
            "Status": "unread",
            "CreatedDate": new Date(),
            "Quantity": quantity
        }

        await axios.post(url_order, orderSlip)
            .then((result) => {
                toast.success("Đặt hàng thành công.");
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <section className="breadcrumb">
                <div className="breadcrumb-arrows">
                    <ul className="navbar">
                        <li><Link to={"/"}><i className='bx bx-left-arrow-alt'></i> Về trang chủ</Link></li>
                    </ul>
                </div>
            </section>

            <section className="new product">
                <div className="card-wrapper">
                    <div className="card">
                        {/* Left */}
                        <div className="product-img">
                            <div className="img-display">
                                <div className="img-showcase">
                                    <img src={`http://vcb-api.somee.com/Photos/Products/${data.Picture}/image.png`} alt={data.Picture} />
                                </div>
                                <div className="img-select">
                                    {
                                        pictureList && pictureList.length > 0 ?
                                            pictureList.map((item, index) => {
                                                return (
                                                    <div className="img-item" key={index}>
                                                        <Link onClick={() => handleChangeImage(item.Picture)} data-id="2">
                                                            <img src={`http://vcb-api.somee.com/Photos/Products/${item.Picture}/image.png`} alt="" />
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="product-content">
                            <h2 className="product-title">
                                {data.ProductName}
                            </h2>

                            <div className="product-price">
                                <p className="price">Giá: <span>{data.Price == 0 ? "Liên hệ" : `${data.Price} đ`}</span></p>
                            </div>

                            <div className="product-detail">
                                <h2>Thông tin sản phẩm</h2>
                                <p>*Mô tả</p>
                                <ul>
                                    <li>Kích thước: <span>{data.Dimension}</span></li>
                                    <li>Chất liệu: <span>{data.Material}</span></li>
                                    <li>Danh mục: <span>{dataCategory.CategoryName}</span></li>
                                    <li>Số lượng: <span>{data.Quantity}</span></li>
                                </ul>
                            </div>

                            <div className="purchase-info">
                                <a href="#checkout-form">
                                    <button type="button" className="btn-order">
                                        Đặt hàng ngay
                                    </button>
                                </a>
                                <button type="button" className="btn-order">
                                    Liên hệ: 0776747680
                                </button>
                            </div>

                            <div className="modal" id="checkout-form" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-header">
                                        <h2 style={{ textAlign: "center" }}>Thông tin đặt hàng</h2>
                                        <a href="#" className="btn-close" aria-hidden="true">×</a>
                                    </div>
                                    <div className="modal-body">
                                        <div className="wrapper">
                                            <div className="checkout-container">

                                                <div className="checkout-left">
                                                    <div className="order-item">
                                                        <div className="order-item-img">
                                                            <img src={`http://vcb-api.somee.com/Photos/Products/${data.Picture}/image.png`} alt={data.Picture} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="checkout-right">
                                                    <h2>Sản phẩm</h2>
                                                    <p>Tên: <span>{data.ProductName}</span></p>
                                                    <p>Chất liệu: <span>{data.Dimension}</span></p>
                                                    <p>Kích thước: <span>{data.Material}</span></p>
                                                    <form>
                                                        <div className="form-group">
                                                            <label htmlFor="name">Họ và tên:</label>
                                                            <input type="text" id="name" name="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="phone">Số điện thoại:</label>
                                                            <input id="phone" name="phone" type="tel" value={numberPhone} onChange={(e) => setNumberPhone(e.target.value)} required />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="address">Địa chỉ nhận hàng:</label>
                                                            <input id="address" name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="quantity">Số lượng:</label>
                                                            <div className="select-quantity">
                                                                <button type="button" onClick={handleIncrease}><i className='bx bx-plus'></i></button>
                                                                <input id="address" name="address" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                                                                <button type="button" onClick={handleDescrease}><i className='bx bx-minus'></i></button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <a href="#" className="btn">Hủy bỏ</a>
                                        <a href="#" type="button" className="btn" onClick={handleAddOrderSlip}>Hoàn tất đặt hàng</a>
                                    </div>
                                </div>
                            </div>

                            <div className="social-links">
                                <p>Share at</p>
                                <Link to={"https://www.facebook.com/thanhnam.media13"}><i className='bx bxl-facebook'></i></Link>
                                <Link to={"/"}><i className='bx bxl-instagram' ></i></Link>
                                <Link to={"/"}><i className='bx bxl-twitch' ></i></Link>
                                <Link to={"https://zalo.me/0776747680"}><i className='bx bxl-whatsapp' ></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <div className="small-container">
                <div className="row row-2">
                    <h2>Sản phẩm liên quan</h2>
                    <Link to={"/shop"}>Xem thêm</Link>
                </div>
            </div>

            <div className="small-container">
                <div className="row">
                    {
                        list && list.length > 0 ?
                            list.map((item, index) => {
                                return (
                                    <div className="col-4" key={index} onClick={() => handleLink(item.ProductID)}>
                                        <img src={`http://vcb-api.somee.com/Photos/Products/${item.Picture}/image.png`} alt={item.Picture} />
                                        <h4>{item.ProductName}</h4>
                                        <p>{item.Price == 0 ? "Liên hệ" : `${item.Price} đ`}</p>
                                    </div>
                                )
                            })
                            :
                            "Loading..."
                    }
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ProductDetails