import Cookies from 'js-cookie';

const setCookie = (name, value) => {
    return Cookies.set(name, value,  { path: '/' })
}

export default setCookie;