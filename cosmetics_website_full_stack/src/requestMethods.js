import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzM5MzU3NDE4OGUwNTMwMzMyNDY2MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMjE3MDU1NCwiZXhwIjoxNzA0NzYyNTU0fQ.ljcxi2YdFdJTYpI3Uyac0o8QfSXB-0Z4drNKgpeRXc8";
export const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});
