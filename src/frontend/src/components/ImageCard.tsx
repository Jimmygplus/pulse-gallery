import { useEffect, useState } from "react";
import { fetchRandomImage, recordImageView } from "../api";
import { motion, AnimatePresence } from "framer-motion";

type ImageInfo = {
    id: number
    name: string
    path: string
}

export default function ImageCard() {
    const [image, setImage] = useState<ImageInfo | null>(null)
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null)

    const loadImage = async () => {
        setLoading(true)
        try {
            const data = await fetchRandomImage()
            setImage(data)
            setKey(prevKey => prevKey + 1)
            await recordImageView(data.id)
        } catch (e) {
            console.error("Error fetching image:", e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadImage()
    }, [])

    const handleNext = () => {
        loadImage()
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
        setTouchStartX(e.touches[0].clientX)
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
        if (touchStartX === null) return
        const deltaX = e.changedTouches[0].clientX - touchStartX
        if (Math.abs(deltaX) > 50) {
            loadImage()
        }
        setTouchStartX(null)
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
            <AnimatePresence mode="wait">
                {image && !loading && (
                    <motion.img
                        key={key}
                        src={`http://localhost:8000/images/${image.name}`}
                        alt={image.name}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-[80vw] max-h-[80vh] rounded-2xl shadow-xl cursor-pointer"
                        onClick={handleNext}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    />
                )}
            </AnimatePresence>
            {loading && <p className="text-gray-500 mt-4">加载中...</p>}
            <p className="mt-2 text-sm text-gray-400">点击或滑动图片以切换</p>
        </div>
    )
}