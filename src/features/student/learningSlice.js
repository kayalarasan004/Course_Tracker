import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    enrolledCourses: [
        // Example structure:
        // { id: 1, title: '...', progress: 35, completedLessons: ['lesson-id-1'], status: 'in-progress' }
    ],
};

const learningSlice = createSlice({
    name: 'learning',
    initialState,
    reducers: {
        enrollCourse: (state, action) => {
            const course = action.payload; // Expect full course mock object or at least id & title
            const exists = state.enrolledCourses.find(c => c.id == course.id);
            if (!exists) {
                state.enrolledCourses.push({
                    ...course,
                    progress: 0,
                    completedLessons: [],
                    status: 'in-progress',
                    lastAccessed: new Date().toISOString()
                });
            }
        },
        updateProgress: (state, action) => {
            const { courseId, progress, lessonId } = action.payload;
            const course = state.enrolledCourses.find(c => c.id == courseId);
            if (course) {
                if (progress !== undefined) course.progress = progress;
                if (lessonId && !course.completedLessons.includes(lessonId)) {
                    course.completedLessons.push(lessonId);
                }
                course.lastAccessed = new Date().toISOString();

                if (course.progress >= 100) {
                    course.status = 'completed';
                }
            }
        }
    },
});

export const { enrollCourse, updateProgress } = learningSlice.actions;
export default learningSlice.reducer;
