import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const students = await readDatabase(process.argv[2]);
      let response = 'This is the list of our students\n';

      for (const [field, names] of Object.entries(students).sort()) {
        response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }

      res.status(200).send(response.trim());
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const students = await readDatabase(process.argv[2]);
      const studentNames = students[major] || [];

      res.status(200).send(`List: ${studentNames.join(', ')}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
