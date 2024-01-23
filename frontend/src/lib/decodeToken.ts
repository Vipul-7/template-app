import { jwtDecode } from "jwt-decode";

export const decodeToken = () => {
    // console.log("decodeToken");
    const token = localStorage.getItem('token');
    // console.log(token);

    if (!token) {
        return null;
    }

    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.log("Expired token");
        return null;
    }

    return decodedToken;
}