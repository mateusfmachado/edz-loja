import Head from './Head';

const Layout = ({ children, title, description, url, image, pagSeguro }) => (
    <div>
        <Head
            title={title}
            description={description}
            url={url}
            ogImage={image}
            pagSeguro={pagSeguro}></Head>
        <div className="body">
            { children }
        </div>
        <footer>
            <div className="flex flex-center">
                <small>
                    &copy; Loja IT - Curso Criando um Ecommerce do Zero
                </small>
            </div>
        </footer>
    </div>
);

export default Layout;