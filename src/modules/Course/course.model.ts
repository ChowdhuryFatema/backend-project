import mongoose, { model, Schema } from "mongoose";
import { TCourseFaculty, TCrouse, TPreRequisiteCourses } from "./course.interface";


const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
})

const courseSchema = new Schema<TCrouse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    prefix: {
        type: String,
        trim: true,
        required: true,
    },
    code: {
        type: Number,
        trim: true,
        required: true,
    },
    credits: {
        type: Number,
        trim: true,
        required: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    }
})

export const Course = model<TCrouse>('Course', courseSchema);

const courseFacultiesSchema = new Schema<TCourseFaculty>({
    course: {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'Course',
    },
    faculties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
        },
    ],
});

export const CourseFaculty = model<TCourseFaculty>('CourseFaculty', courseFacultiesSchema);
