import axios from 'axios';

const API_BASE = "http://localhost:8000/api" // replace with .env later

export const fetchRandomImage = async () => {
    const res = await axios.get(`${API_BASE}/image/random`)
    return res.data
}

export const recordImageView = async (imageId: number) => {
    await axios.post(`${API_BASE}/image/${imageId}/view`)
}
