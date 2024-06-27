import { Component } from 'react'
import Swal from 'sweetalert2'

export default class ErrorBoundary extends Component {

    state = { hashError: false }

    static getDerivedStateFromErrr(error) {
        return { hashError: true }
    }

    componentDidCatch(error, info) {
        console.log('Error', error, 'info',info)
        return Swal.fire({
            customClass: "swal-wide",
            allowOutsideClick: false,
            showCancelButton: 0,
            title: error,
            text: info.componentStack,
            icon: "error",
            confirmButtonText: "Reload this page",
            hideOnOverlayClick: false,
            hideOnContentClick: false,
            backdrop:'linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)',
            closeClick: false,
            helpers: {
                overlay: { closeClick: false } 
            }
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.reload()
            }
        })
    }

  render() {

    if(this.state.hashError) {
        return this.props.fallback
    }
    return this.props.children
  }
}
