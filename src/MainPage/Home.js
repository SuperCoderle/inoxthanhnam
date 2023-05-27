import { Link } from "react-router-dom"
import product from "../asset/image/TuInoxKinhNho.jpg"
import "../asset/css/home.css"
import Header from "./Header-Footer/Header"
import Footer from "./Header-Footer/Footer"
import banner from "../asset/image/banner.png"
import banner1 from "../asset/image/banner1.png"
import banner2 from "../asset/image/banner2.png"
import banner3 from "../asset/image/banner3.png"
import banner4 from "../asset/image/banner4.png"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

const Home = () => {
    const url = "http://vcb-api.somee.com/api/Product/"

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        await axios.get(url)
            .then((result) => {
                setData(result.data.sort((a, b) => a.CreatedDate - b.CreatedDate).slice(0, 4));
                setData2(result.data.sort(() => Math.random() - Math.random()).slice(0, 4));
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    return (
        <>
            <Header />
            <section className="banner">
                <div className="slideshow">
                    <div className="slideshow-wrapper">
                        <div className="slide">
                            <img className="slide-img"
                                src=
                                {banner} />
                        </div>
                        <div className="slide">
                            <img className="slide-img"
                                src=
                                {banner1} />
                        </div>
                        <div className="slide">
                            <img className="slide-img" src=
                                {banner2} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="new product">
                <div className="center-text">
                    <h2>Sản phẩm mới</h2>
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
                                                <h5 style={{ float: "left" }}>Giá: </h5>
                                                <h5 style={{ float: "right" }}>{item.Price == 0 ? "Liên hệ" : `${item.Price} đ`}</h5>
                                            </div>
                                            <div className="top">
                                                <p>new</p>
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

            <section className="banner">
                <div className="banner-img">
                    <img src={banner3} alt="" />
                </div>

                <div className="banner-img">
                    <img src={banner4} alt="" />
                </div>
            </section>

            <section className="new product">
                <div className="center-text">
                    <h2>Sản phẩm bán chạy</h2>
                </div>

                <div className="content">
                    {
                        data2 && data2.length > 0 ?
                            data2.map((item, index) => {
                                return (
                                    <div className="new-content" key={index}>
                                        <div className="row">
                                            <img src={`http://vcb-api.somee.com/Photos/Products/${item.Picture}/image.png`} alt={item.Picture} />
                                            <h4>{item.ProductName}</h4>
                                            <div className="product-price">
                                                <h5 style={{ float: "left" }}>Giá:</h5>
                                                <h5 style={{ float: "right" }}>{item.Price == 0 ? "Liên hệ" : `${item.Price} đ`}</h5>
                                            </div>
                                            <div className="top">
                                                <p>hot</p>
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

export default Home