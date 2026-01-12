import api from './api';

const CERTIFICATE_API_URL = '/certificates';

const certificateService = {
    // Get certificate by ID
    getCertificateById: async (certificateId) => {
        const response = await api.get(`${CERTIFICATE_API_URL}/${certificateId}`);
        return response.data;
    },

    // Download certificate (expecting blob/pdf)
    downloadCertificate: async (certificateId) => {
        const response = await api.get(`${CERTIFICATE_API_URL}/${certificateId}/download`, {
            responseType: 'blob'
        });
        return response.data;
    },

    // Get all certificates for a student
    getStudentCertificates: async (studentId) => {
        const response = await api.get(`${CERTIFICATE_API_URL}/student/${studentId}`);
        return response.data;
    }
};

export default certificateService;
