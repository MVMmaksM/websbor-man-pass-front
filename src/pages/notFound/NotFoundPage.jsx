import { Link } from "react-router-dom"

export const NotFoundPage = () => {

    return (
        <div id="notFoundPage">
            <h1>404</h1>
            <h2>Страница не найдена</h2>
            <p>Извините, страница, которую вы ищете, не существует.</p>
            <Link to="/main" style={{ marginTop: '20px', color: '#007BFF' }}>
                ← Вернуться на главную
            </Link>
        </div>
    )
}