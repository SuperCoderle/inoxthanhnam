import Footer from "./Header-Footer/Footer"
import Header from "./Header-Footer/Header"


function Intro() {
    return (
        <>
            <Header />
            <section className="intro" style={{ marginTop: "10rem" }}>
                <h1>
                    Về chúng tôi
                    <br />
                    <img src="https://image.ibb.co/nk616F/Layer_1_copy_21.png" width="47" height="11" align="center" />
                </h1>
                <article>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into electronic typesetting, remaining. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                        an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining .
                    </p>
                </article>
            </section>
            <Footer />
        </>
    )
}

export default Intro