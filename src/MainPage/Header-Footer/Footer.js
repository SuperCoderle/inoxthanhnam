import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <section className="contact">
                <div className="contact-box">
                    <h4>MY ACCOUNT</h4>
                    <li><Link to={"/admin"}>Đăng nhập admin</Link></li>
                </div>

                <div className="contact-box">
                    <h4>SẢN PHẨM</h4>
                    <li><Link to={"/categories/inox"}>Inox</Link></li>
                    <li><Link to={"/categories/wooden-furniture"}>Gỗ nội thất</Link></li>
                    <li><Link to={"/categories/houseware"}>Đồ gia dụng</Link></li>
                    <li><Link to={"/categories/machine"}>Máy móc</Link></li>
                </div>

                <div className="contact-box">
                    <h4>LIÊN HỆ</h4>
                    <li><Link to={"/"}><i className='bx bx-phone'></i> 0776747680 - 0909239816 - 0902273698</Link></li>
                    <li><Link to={"/"}><i className='bx bx-location-plus' ></i> Chi Nhánh 1 : 99 Đường T1,Phường Tây Thạnh , Quận Tân Phú</Link></li>
                    <li><Link to={"/"}><i className='bx bx-envelope' ></i> namsipo.2001@gmail.com</Link></li>
                </div>

                <div className="contact-box">
                    <h4>Thành Nam</h4>
                    <h5>Connect with us</h5>
                    <div className="social">
                        <Link to={"https://www.facebook.com/thanhnam.media13"}><i className='bx bxl-facebook' ></i></Link>
                        <Link to={"/"}><i className='bx bxl-instagram' ></i></Link>
                        <Link to={"/"}><i className='bx bxl-twitter' ></i></Link>
                    </div>
                </div>
            </section>

            <a href="#" className="scroll-top"><i className='bx bx-chevrons-up'></i></a>

            <div className="end-text">
                <p>© Bản quyền thuộc sở hữu của Thành Nam</p>
            </div>
        </>
    )
}

export default Footer