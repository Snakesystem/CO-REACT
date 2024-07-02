import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="navbar navbar-expand-lg sticky-bottom shadow-none justify-content-center">
      <div className="col-12 col-md-4">
        <div className="footer-end text-center">
            <img src="img/logo-ojk.png" alt="" style={{width: "15%"}}/>
            <img src="img/logo-akses-kesei.png" alt="" style={{width: "15%", paddingLeft: "30px"}}/>
            <img src="img/logo-inklusi-keuangan.png" alt="" style={{width: "15%", paddingLeft: "30px"}}/>
            <img src="img/logo-idx.png" alt="" style={{width: "15%", paddingLeft: "30px"}}/>
        </div>
      </div>
      <div className="col-12 col-md-5 mt-2 text-center">
        <p className="footer-end1" style={{fontSize: "11.5pt"}}>
        &copy; 2021. By <Link target='_blank' to="https://github.com/Snakesystem">@Snakesystem</Link>
        </p>
      </div>
    </footer>
  )
}
