const TestPerfomance = require('../models/testPerfomance');

// Create a new TestPerfomance entry
const createTestPerfomance = async (req, res) => {
    try {
        const newTestPerfomance = await TestPerfomance.create(req.body);
        res.status(201).json(newTestPerfomance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all TestPerfomance entries
const getAllTestPerfomances = async (req, res) => {
    try {
        const testPerfomances = await TestPerfomance.find().populate('student test');
        res.status(200).json(testPerfomances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get TestPerfomance by ID
const getTestPerfomanceById = async (req, res) => {
    try {
        const testPerfomance = await TestPerfomance.findById(req.params.id).populate('student test');
        if (!testPerfomance) {
            return res.status(404).json({ error: 'TestPerfomance not found' });
        }
        res.status(200).json(testPerfomance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update TestPerfomance by ID
const updateTestPerfomanceById = async (req, res) => {
    try {
        const updatedTestPerfomance = await TestPerfomance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTestPerfomance) {
            return res.status(404).json({ error: 'TestPerfomance not found' });
        }
        res.status(200).json(updatedTestPerfomance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete TestPerfomance by ID
const deleteTestPerfomanceById = async (req, res) => {
    try {
        const deletedTestPerfomance = await TestPerfomance.findByIdAndDelete(req.params.id);
        if (!deletedTestPerfomance) {
            return res.status(404).json({ error: 'TestPerfomance not found' });
        }
        res.status(200).json(deletedTestPerfomance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get overall performance for a student
const getOverallPerformanceForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const overallPerformance = await TestPerfomance.find({ student: studentId }).populate('test');
        if (!overallPerformance || overallPerformance.length === 0) {
            return res.status(404).json({ error: 'No performance data found for the given student' });
        }
        res.status(200).json(overallPerformance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get student answers and calculate performance for a specific test
const getStudentTestPerformance = async (req, res) => {
    try {
        const { studentId, testId } = req.params;

        // Fetch all student responses for the given test
        const studentResponses = await StudentResponse.find({
            student: studentId,
            testQuestion: { $in: await TestQuestion.find({ test: testId }).select('_id') }
        }).populate('testQuestion');

        if (!studentResponses || studentResponses.length === 0) {
            return res.status(404).json({ error: 'No responses found for the given student and test' });
        }

        // Calculate total marks
        let totalMarks = 0;
        let totalQuestions = studentResponses.length;

        for (const response of studentResponses) {
            const marksRecord = await TestQuestionMarks.findOne({ studentResponse: response._id });
            if (marksRecord) {
                totalMarks += marksRecord.student_marks;
            }
        }

        // Calculate grade
        const grade = totalMarks / totalQuestions;

        // Fetch existing performance record or create a new one
        let testPerformance = await TestPerfomance.findOne({ student: studentId, test: testId });

        if (!testPerformance) {
            testPerformance = new TestPerfomance({
                feedback: '', // Can be updated separately
                grade: grade,
                student: studentId,
                test: testId
            });
        } else {
            testPerformance.grade = grade;
        }

        await testPerformance.save();

        res.status(200).json({ studentResponses, totalMarks, grade, testPerformance });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTestPerfomance,
    getAllTestPerfomances,
    getTestPerfomanceById,
    updateTestPerfomanceById,
    deleteTestPerfomanceById,
    getOverallPerformanceForStudent,
    getStudentTestPerformance
};
