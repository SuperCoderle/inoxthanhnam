import { Link } from "react-router-dom"
import logo from "../../asset/image/logo.png"
import { useState } from "react"

const Header = () => {
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
    }
    return (
        <>
            <header>
                <div className="nav-top">
                    <ul className="nav-contact">
                        <li><i className='bx bx-location-plus'></i> Chi Nhánh 1 : 99 Đường T1,Phường Tây Thạnh , Quận Tân Phú</li>
                        <li><i className='bx bx-phone' ></i> 0776747680</li>
                        <li><i className='bx bx-envelope' ></i> namsipo.2001@gmail.com</li>
                    </ul>
                </div>
                <div className="nav-item">
                    <Link to={"/"} className="logo">
                        <img src={logo} alt="" />
                    </Link>

                    <ul className={`navbar ${isActive ? "active" : null}`}>
                        <li><Link to={"/"}>Trang chủ</Link></li>
                        <li>
                            <Link to={"/shop"}>Sản phẩm</Link>
                            <ul className="dropdown-list">
                                <li>
                                    <Link to={"/categories/inox"}><i className='bx bxs-chevron-right'></i> Inox</Link>
                                </li>

                                <li>
                                    <Link to={"/categories/wooden-furniture"}><i className='bx bxs-chevron-right'></i> Gỗ nội thất</Link>
                                </li>
                                <li>
                                    <Link to={"/categories/houseware"}><i className='bx bxs-chevron-right'></i> Đồ gia dụng</Link>
                                </li>
                                <li>
                                    <Link to={"/categories/machine"}><i className='bx bxs-chevron-right'></i> Máy móc</Link>
                                </li>
                            </ul>
                        </li>
                        <li><Link to={"/intro"}>Giới thiệu</Link></li>
                    </ul>

                    <div className="h-icons">
                        <a href="tel:0776747680"><i className='bx bx-phone' ></i></a>
                        <div className={`bx bx-menu ${isActive ? "bx-x" : null}`} id="menu-icon" onClick={handleToggle}></div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header