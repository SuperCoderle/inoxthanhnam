import Footer from "../Header-Footer/Footer"
import Header from "../Header-Footer/Header"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"


const Houseware = () => {
    const url = "http://vcb-api.somee.com/api/Product/";
    const url_category = "http://vcb-api.somee.com/api/Category/";

    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    async function getData() {
        const response = await axios.get(url_category)
            .catch((error) => {
                toast.error(error.message);
            })
        const categoryId = response.data.filter(c => c.CategoryName.toLowerCase().includes("đồ gia dụng"))[0].CategoryID;

        await axios.get(url + `Category/${categoryId}`)
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    return (
        <>
            <Header />
            <section className="breadcrumb">
                
            </section>

            <section className="new product">
                <div className="center-text">
                    <h2>Đồ gia dụng</h2>
                </div>

                <div className="content">
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <div className="new-content" key={index}>
                                        <div className="row">
                                            <img src={`http://vcb-api.somee.com/Photos/Products/${item.Picture}/image.png`} alt={item.Picture} />
                                            <h4>{item.ProductName}</h4>
                                            <div className="product-price">
                                                <h5 style={{ float: "left" }}>Giá:</h5>
                                                <h5 style={{ float: "right" }}>{item.Price == 0 ? "Liên hệ" : `${item.Price} đ`}</h5>
                                            </div>
                                            <div className="bbtn">
                                                <Link to={`/product/details/${item.ProductID}`}>Mua ngay</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            "Loading..."
                    }
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Houseware