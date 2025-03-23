import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:9999", // Thay URL này bằng API của bạn
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
