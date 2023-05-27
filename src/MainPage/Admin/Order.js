import { useEffect, useState } from "react"
import Menu from "./Menu"
import { Link } from "react-router-dom"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

function Order() {
    const url = "http://vcb-api.somee.com/api/Product/";
    const url_order = "http://vcb-api.somee.com/api/OrderSlip/";

    const [data, setData] = useState([]);
    const [order, setOrder] = useState({});
    const [product, setProduct] = useState({});

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        await axios.get(url_order)
            .then((result) => {
                setData(result.data.sort((a, b) => a.CreatedDate - b.CreatedDate));
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    async function getDataById(id) {
        const response = await axios.get(url_order + id)
            .catch((error) => {
                toast.error(error.message);
            })
        setOrder(response.data[0]);
        await axios.get(url + response.data[0].ProductId)
            .then((result) => {
                setProduct(result.data[0]);
            })
            .catch((error) => {
                toast.error(error.message);
            })
        if(response.data[0].Status == "unread")
        {
            const data = {
                "OrderId" : response.data[0].OrderId,
                "CustomerName" : response.data[0].CustomerName,
                "NumberPhone" : response.data[0].NumberPhone,
                "Address" : response.data[0].Address,
                "ProductId" : response.data[0].ProductId,
                "Status": "read",
                "CreatedDate": response.data[0].CreatedDate,
                "Quantity" : response.data[0].Quantity
            }
            await axios.put(url_order, data)
            .then((result) => {
                getData();
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
                            <li><Link to={"/order"}>Đơn hàng</Link></li>
                        </ul>
                    </div>

                    <div className="board">
                        <div className="title">
                            <h3>Đơn hàng</h3>
                        </div>

                        <ul className="message-list">
                            {
                                data && data.length > 0 ?
                                    data.map((item, index) => {
                                        return (
                                            item.Status == "unread" ?
                                                (<a href="#bill" onClick={() => getDataById(item.OrderId)} key={index}>
                                                    <li className="message-item not-readed">
                                                        <div className="header">
                                                            <h3 className="author">Tin nhắn chưa đọc</h3><span className="date">{moment(item.CreatedDate).format("DD-MM-YYYY")}</span>
                                                        </div>
                                                        <h2 className="title">Bạn có đơn hàng mới!</h2>
                                                        <p className="text">Khách hàng: {item.CustomerName}...</p>
                                                    </li>
                                                </a>)
                                                :
                                                (<a href="#bill" onClick={() => getDataById(item.OrderId)} key={index}>
                                                    <li className="message-item">
                                                        <div className="header">
                                                            <h3 className="author">Tin nhắn</h3><span className="date">{moment(item.CreatedDate).format("DD-MM-YYYY")}</span>
                                                        </div>
                                                        <h2 className="title">Bạn có đơn hàng mới!</h2>
                                                        <p className="text">Khách hàng: {item.CustomerName}...</p>
                                                    </li>
                                                </a>)
                                        )
                                    })
                                    :
                                    "Loading..."
                            }
                        </ul>
                    </div>

                    <div className="modal" id="bill" aria-hidden="true">
                        <div className="modal-dialog" style={{width: "auto", left: "50%"}}>
                            <div className="modal-header">
                                <h2 style={{ textAlign: "center" }}>Thông tin đặt hàng</h2>
                                <a href="#" className="btn-close" aria-hidden="true">×</a>
                            </div>
                            <div className="modal-body">
                                <div className="bill">
                                    <div className="brand">
                                        Nội thất inox Thành Nam
                                    </div>
                                    <div className="address">
                                        99 Đường T1,Phường Tây Thạnh , Quận Tân Phú <br /> SĐT: 0776747680
                                    </div>
                                    <div className="shop-details">
                                    </div>
                                    <div style={{ marginTop: "2px" }}>Thông tin đơn hàng </div>
                                    <table className="table-order">
                                        <thead>
                                            <tr className="header">
                                                <th style={{ width: "50%" }}>
                                                    Tên sản phẩm
                                                </th>
                                                <th style={{ width: "40%" }}>
                                                    Số lượng
                                                </th>
                                                <th>
                                                    Giá
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="details">
                                                <td>{product.ProductName}</td>
                                                <td>{order.Quantity}</td>
                                                <td>{product.Price}</td>
                                            </tr>
                                            <tr className="total">
                                                <td>Tổng cộng</td>
                                                <td>{order.Quantity}</td>
                                                <td>{product.Price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    Khách hàng: {order.CustomerName}
                                    <br />
                                    SĐT: {order.NumberPhone}
                                    <br />
                                    Địa chỉ: {order.Address}
                                    <br />
                                    Thank You ! Please visit again
                                </div>
                            </div>
                            <div className="modal-footer">
                                <a href="#" type="button" className="btn">In hóa đơn</a>
                            </div>
                        </div>
                    </div>
                </section>
            </nav>
        </>
    )
}

export default Order