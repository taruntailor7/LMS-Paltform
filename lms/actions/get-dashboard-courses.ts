import { Category, Chapter, Course } from "@prisma/client";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
}

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[];
    coursesInProgress: CourseWithProgressWithCategory[];
}
export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
    try {
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId: userId,
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            }
                        }
                    }
                }
            }
        });

        const coueses = purchasedCourses.map((purchase) => purchase.course) as CourseWithProgressWithCategory[];

        for(let course of coueses) {
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        const completedCourses = coueses.filter((course) => course.progress === 100);

        // First way of writing this
        // const coursesInProgress = coueses.filter((course) => course.progress !== 100);

        // Second way of writing this
        const coursesInProgress = coueses.filter((course) => (course.progress ?? 0) < 100);

        return {
            completedCourses,
            coursesInProgress
        }
    } catch (error) {
        console.log("[GET_DASHBOARD_COURSE] Error", error); 
        return {
            completedCourses: [],
            coursesInProgress: [],
        }
    }
}