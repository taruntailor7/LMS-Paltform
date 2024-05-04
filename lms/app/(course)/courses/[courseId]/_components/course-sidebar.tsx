import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { db } from "@/lib/db";
import { CourseSidebarItem } from "./course-sidebar-item";


interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[]
    },
    progressCount: number;
}

export const CourseSidebar = async ({
    course,
    progressCount,
}: CourseSidebarProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect('/')
    }

    const purchase = await db.purchase.findUnique({
        where: {
            userId_coureseId: {
                userId,
                coureseId: course.id,
            }
        }
    });

    
    return (
        <div className="h-full w-[320px] border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">
                    {course.title}
                </h1>
                {/* Check purchase and add prpgress */ }
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !purchase}
                    />
                ))}
            </div>
        </div>
    );
}