function LoggedIn() {
    const token = localStorage.getItem('token')
    let logged = false
    if(token){
        logged = true
        return logged
    }
    else return logged
}

export default LoggedIn
