import { Link } from "react-router-dom"
import "../../asset/css/menu.css"

const Menu = () => {
    return (
        <section className="app">
            <aside className="sidebar">
                <header>Trang quản lý</header>

                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <Link to={"/user"}><i className='bx bxs-user'></i> Tài khoản</Link>
                        </li>
                        <li>
                            <Link to={"/product"}><i className='bx bxs-box' ></i> Sản phẩm</Link>
                        </li>
                        <li>
                            <Link to={"/order"}><i className='bx bxs-message'></i> Đơn hàng</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </section>
    )
}

export default Menu