import Header from "../components/Header";
import './ErrorPage.css'

export default function ErrorPage() {
  return (
    <>
      <title>404 Not Found</title>
      <Header />

      <div className="error-message">Error 404!! Page Not Found</div>
    </>
  )
}