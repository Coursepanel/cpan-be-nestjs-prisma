import mongoose from 'mongoose';

const cleanMongo = async () => {
  const connection = await mongoose.connect(
    // process.env.MONGO_CONNECTION_STRING,
    'mongodb+srv://coursemapper:anA56sz3*CM100@varaipatam.2g6bq.mongodb.net/coursemap-db?retryWrites=true&w=majority',
    // 'mongodb://localhost:27017/coursemap-db',
  );
  let errorCounter = 0;
  let successCounter = 0;
  console.log(connection);
  if (!connection) return;
  const Schema = mongoose.Schema;
  const courseSchema = new Schema({
    courseCode: String,
    name: String,
    credits: Number,
    deptCode: String,
    courseContent: [String],
    description: String,
    courseType: String,
    textBooks: [String],
    referenceBooks: [String],
    prerequisites: [String],
  });
  const Course = mongoose.model('Course', courseSchema, 'courses');
  //   for (let i = 0; 20; i++) {
  for await (const doc of Course.find()) {
    // console.log(doc.name);
    try {
      doc.name = processValue(doc.name);
      doc.description = processValue(doc.description);
      doc.courseContent = processStringToStringArray(doc.courseContent);
      doc.textBooks = processStringToStringArray(doc.textBooks);
      doc.referenceBooks = processStringToStringArray(doc.referenceBooks);
      doc.prerequisites = processStringToStringArray(doc.prerequisites);
      await doc.save();
      successCounter++;
      console.log(doc.courseCode, successCounter);
    } catch (error) {
      console.log('invalid row', errorCounter++, doc.courseCode, error);
    }
  }
  //   }
};
cleanMongo();

const processStringToStringArray = (value: string[]): string[] => {
  return !value.length
    ? []
    : value.map((elem: string) => {
        if (elem?.length > 0) {
          elem.replace(/\\t/g, '');
          return processValue(elem.trim());
        } else {
          return '';
        }
      });
};

const processValue = (value: string): null | string => {
  const actualValue: string = value?.toLowerCase();
  if (
    !value ||
    !actualValue ||
    actualValue === 'nil' ||
    actualValue === '-nil-' ||
    actualValue === 'null' ||
    actualValue === 'na' ||
    actualValue === 'n/a' ||
    actualValue === 'none' ||
    actualValue === '---' ||
    actualValue === 'NULL'
  ) {
    return '';
  } else return value;
};
