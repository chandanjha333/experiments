import Header from "../components/Header";
import './ErrorPage.css'

export default function ErrorPage({ cart }) {
  return (
    <>
      <title>404 Not Found</title>
      <Header cart={cart}/>

      <div className="error-message">Error 404!! Page Not Found</div>
    </>
  )
}