import { Types } from "mongoose";


export type TPreRequisiteCourses = {
    course: Types.ObjectId;
    isDeleted: boolean;
}

export type TCrouse = {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: [TPreRequisiteCourses];
    isDeleted?: boolean;
}


export type TCourseFaculty = {
    course: Types.ObjectId;
    faculties: [Types.ObjectId];
}