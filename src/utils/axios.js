import axios from "axios";
//la partie provider qui de repete pour chaque requette http
export default axios.create({
    baseURL:'https://lms-projet-default-rtdb.firebaseio.com/'
})