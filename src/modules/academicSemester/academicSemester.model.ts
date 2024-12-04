import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCodeSchema, AcademicSemesterNameSchema, Months } from "./academicSemester.constant";

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterNameSchema,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCodeSchema,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

AcademicSemesterSchema.pre('save', async function(next){
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  })
  if(isSemesterExists){
    throw new Error('Semester is already exists !')
  }
  next()
})

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', AcademicSemesterSchema)