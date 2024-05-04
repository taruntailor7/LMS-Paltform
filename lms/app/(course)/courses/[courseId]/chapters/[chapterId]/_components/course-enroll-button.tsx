import axios from "axios"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

import { formatePrice } from "@/lib/format"
import { useState } from "react"

interface CourseEnrollButtonProps {
    price: number,
    courseId: string
}

export const CourseEnrollButton = ({
    price,
    courseId,
}: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`/api/courses/${courseId}/checkout`)

            window.location.assign(response.data.url);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            size="sm"
            className="sm:w-full md:w-auto"
        >
            Enroll for {formatePrice(price)}
        </Button>
    )
}