import { Questionnaire } from "../../models/qualifying/questionnaire";

export class QualifyDto {
    // studentId!: number;
    teacherId!: number;
    courseId!: number;
    // careerId!: number;
    // cycleNumber!: number;
    qualificationTotal!: number;
    questionScoreAverage!: number;
    // user!: string;
    detail!: Questionnaire[];
}