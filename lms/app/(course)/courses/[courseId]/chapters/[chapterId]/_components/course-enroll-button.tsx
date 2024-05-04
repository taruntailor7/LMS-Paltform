import { Button } from "@/components/ui/button"
import { formatePrice } from "@/lib/format"

interface CourseEnrollButtonProps {
    price: number,
    courseId: string
}

export const CourseEnrollButton = ({
    price,
    courseId,
}: CourseEnrollButtonProps) => {
    return (
        <Button
            size="sm"
            className="sm:w-full md:w-auto"
        >
            Enroll for {formatePrice(price)}
        </Button>
    )
}