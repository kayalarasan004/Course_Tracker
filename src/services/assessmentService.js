import api from './api';

const ASSESSMENT_API_URL = '/assessments';

const assessmentService = {
    // Get assessment for a course module
    getAssessmentByCourseId: async (courseId) => {
        const response = await api.get(`${ASSESSMENT_API_URL}/course/${courseId}`);
        return response.data;
    },

    // Submit assessment
    submitAssessment: async (assessmentId, answers) => {
        const response = await api.post(`${ASSESSMENT_API_URL}/${assessmentId}/submit`, answers);
        return response.data;
    },

    // Get result
    getAssessmentResult: async (submissionId) => {
        const response = await api.get(`${ASSESSMENT_API_URL}/submission/${submissionId}`);
        return response.data;
    }
};

export default assessmentService;
