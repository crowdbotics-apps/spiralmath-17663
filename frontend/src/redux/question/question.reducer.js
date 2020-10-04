import questionTypes from "./question.type";

const initialState = {
   userQuestions: {},
   allQuestions: {},
   answer: {},
   deletingQuestion: false,
   updatingQuestion: false,
   creatingQuestion: false,
   creatingAnswer: false,
   loadingUserQuestions: false,
   loadingAllUserQuestions: false,
   standardCode: {
      Brief: [
         "Understand the characteristics of shapes and categories of shapes.",
         "Give real-world interpretations of the products of whole numbers.",
         "Multiply and divide within 100. ",
         "Use the fundamental properties of multiplication and division as tools to solve problems.",
         "Memorize the products of all one-digit numbers.",
         "Convert two-step word problems into equations and solve. Estimate answers.",
         "Use the fundamental properties of multiplication and division as tools to solve problems.",
         "Read and write time and solve time problems.",
         "Measure, estimate, and calculate mass and volume.",
         "Represent data by scaled bar graphs and picture graphs.",
         "Use the sides of a rectangle to calculate its area.",
         "Solve problems involving perimeters of polygons.",
         "Determine area by counting unit squares",
         "Use various methods to fluently add and subtract within 1000.",
         "Evaluate expressions.",
         "Write expressions.",
         "Generate numerical patterns from rules.",
         "A digit moved one place is worth 10 times or 1/10.",
         "Powers of 10.",
         "Use decimals to thousandths.",
         "Compare two decimals to thousandths using >, =, <.",
         "Round decimals.",
      ],
      Grade: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5],
      Complete: [
         "Understand that shapes in different categories (e.g., rhombuses, rectangles, and others) may share attributes (e.g., having four sides), and that the shared attributes can define a larger category (e.g., quadrilaterals). Recognize rhombuses, rectangles, and squares as examples of quadrilaterals, and draw examples of quadrilaterals that do not belong to any of these subcategories.",
         "Interpret products of whole numbers, e.g., interpret 5 × 7 as the total number of objects in 5 groups of 7 objects each. For example, describe a context in which a total number of objects can be expressed as 5 × 7.",
         "Use multiplication and division within 100 to solve word problems in situations involving equal groups, arrays, and measurement quantities, e.g., by using drawings and equations with a symbol for the unknown number to represent the problem.",
         "Apply properties of operations as strategies to multiply and divide. Examples: If 6 × 4 = 24 is known, then 4 × 6 = 24 is also known. (Commutative property of multiplication.) 3 × 5 × 2 can be found by 3 × 5 = 15, then 15 × 2 = 30, or by 5 × 2 = 10, then 3 × 10 = 30. (Associative property of multiplication.) Knowing that 8 × 5 = 40 and 8 × 2 = 16, one can find 8 × 7 as 8 × (5 + 2) = (8 × 5) + (8 × 2) = 40 + 16 = 56. (Distributive property.)",
         "Fluently multiply and divide within 100, using strategies such as the relationship between multiplication and division (e.g., knowing that 8 × 5 = 40, one knows 40 ÷ 5 = 8) or properties of operations. By the end of Grade 3, know from memory all products of two one-digit numbers.",
         "Solve two-step word problems using the four operations. Represent these problems using equations with a letter standing for the unknown quantity. Assess the reasonableness of answers using mental computation and estimation strategies including rounding. [This standard is limited to problems posed with whole numbers and having whole-number answers; students should know how to perform operations in conventional order when there are no parentheses to specify a particular order (Order of Operations).]",
         "Apply properties of operations as strategies to multiply and divide. Examples: If 6 × 4 = 24 is known, then 4 × 6 = 24 is also known. (Commutative property of multiplication.) 3 × 5 × 2 can be found by 3 × 5 = 15, then 15 × 2 = 30, or by 5 × 2 = 10, then 3 × 10 = 30. (Associative property of multiplication.) Knowing that 8 × 5 = 40 and 8 × 2 = 16, one can find 8 × 7 as 8 × (5 + 2) = (8 × 5) + (8 × 2) = 40 + 16 = 56. (Distributive property.)",
         "Tell and write time to the nearest minute and measure time intervals in minutes. Solve word problems involving addition and subtraction of time intervals in minutes, e.g., by representing the problem on a number line diagram.",
         "Measure and estimate liquid volumes and masses of objects using standard units of grams (g), kilograms (kg), and liters (l).1 Add, subtract, multiply, or divide to solve one-step word problems involving masses or volumes that are given in the same units, e.g., by using drawings (such as a beaker with a measurement scale) to represent the problem. Exclude multiplicative comparison problems (problems involving notions of “times as much”)",
         'Draw a scaled picture graph and a scaled bar graph to represent a data set with several categories. Solve one- and two-step "how many more" and "how many less" problems using information presented in scaled bar graphs. For example, draw a bar graph in which each square in the bar graph might represent 5 pets.',
         "Multiply side lengths to find areas of rectangles with whole-number side lengths in the context of solving real world and mathematical problems, and represent whole-number products as rectangular areas in mathematical reasoning.",
         "Solve real world and mathematical problems involving perimeters of polygons, including finding the perimeter given the side lengths, finding an unknown side length, and exhibiting rectangles with the same perimeter and different areas or with the same area and different perimeters.",
         "Measure areas by counting unit squares (square cm, square m, square in, square ft, and improvised units).",
         "Fluently add and subtract within 1000 using strategies and algorithms based on place value, properties of operations, and/or the relationship between addition and subtraction.",
         "Apply the order of operations to evaluate numerical expressions.",
         "Write simple expressions that record calculations with numbers, and interpret numerical expressions without evaluating them.",
         "Generate two numerical patterns using two given rules. Identify apparent relationships between corresponding terms. Form ordered pairs consisting of corresponding terms from the two patterns, and graph the ordered pairs on a coordinate plane.",
         "Recognize that in a multi-digit number, a digit in one place represents 10 times as much as it represents in the place to its right and 1/10 of what it represents in the place to its left.",
         "Use whole-number exponents to denote powers of 10. Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10.",
         "Read, write, and compare decimals to thousandths. Read and write decimals to thousandths using base-ten numerals, number names, and expanded form. ",
         "Read, write, and compare decimals to thousandths. Compare two decimals to thousandths based on meanings of the digits in each place, using >, =, and < symbols to record the results of comparisons. ",
         "Use place value understanding to round decimals to any place.",
      ],
      UploadedBy: [
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
         "",
      ],
      "Standard Set": [
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "CCSS-2010",
         "NY-NxGen-2017",
         "NY-NxGen-2017",
         "NY-NxGen-2017",
         "NY-NxGen-2017",
         "NY-NxGen-2017",
         "NY-NxGen-2017",
         "NY-NxGen-2017",
         "NY-NxGen-2017",
      ],
      "Standard Code": [
         "3.G.A.1\n",
         "3.OA.A.1",
         "3.OA.A.3",
         "3.OA.B.5",
         "3.OA.C.7",
         "3.OA.D.8",
         "3.OA.D.9",
         "3.MD.A.1",
         "3.MD.A.2",
         "3.MD.B.3",
         "3.MD.C.7.B",
         "3.MD.D.8",
         "3.MD.C.6",
         "3.NBT.A.2",
         "NY-5.OA.1",
         "NY-5.OA.2",
         "NY-5.OA.3",
         "NY-5.NBT.1",
         "NY-5.NBT.2",
         "NY-5.NBT.3.a",
         "NY-5.NBT.3.b",
         "NY-5.NBT.4",
      ],
      "Uploaded YYYY-MM-DD": [
         "2020-09-11",
         "2020-09-12",
         "2020-09-13",
         "2020-09-14",
         "2020-09-15",
         "2020-09-16",
         "2020-09-17",
         "2020-09-18",
         "2020-09-19",
         "2020-09-20",
         "2020-09-21",
         "2020-09-22",
         "2020-09-23",
         "2020-09-24",
         "2020-09-25",
         "2020-09-26",
         "2020-09-27",
         "2020-09-28",
         "2020-09-29",
         "2020-09-30",
         "2020-10-01",
         "2020-10-02",
      ],
   },
};

export default (state = initialState, action) => {
   switch (action.type) {
      case questionTypes.GETSTANDARDCODE_SUCCESS:
         return { ...state, standardCode: action.payload };
      case questionTypes.CREATE_QUESTION_REQUEST:
         return { ...state, creatingQuestion: true };
      case questionTypes.CREATE_QUESTION_SUCCESS:
         return { ...state, creatingQuestion: "success" };
      case questionTypes.CREATE_QUESTION_FAILURE:
         return { ...state, creatingQuestion: "fail" };
      case questionTypes.CREATE_ANSWER_REQUEST:
         return { ...state, creatingAnswer: true };
      case questionTypes.CREATE_ANSWER_SUCCESS:
         return { ...state, creatingAnswer: "success" };
      case questionTypes.CREATE_ANSWER_FAILURE:
         return { ...state, creatingAnswer: "fail" };
      case questionTypes.GET_USERQUESTION_SUCCESS:
         return {
            ...state,
            userQuestions: {
               questionCount: action.data.count,
               questions: action.data.results,
            },
         };
      case questionTypes.GET_QUESTION_SUCCESS:
         return {
            ...state,
            allQuestions: {
               questionCount: action.data.count,
               questions: action.data.results,
            },
         };
      case questionTypes.UPDATE_QUESTION_REQUEST:
         return {
            ...state,
            updatingQuestion: true,
         };
      case questionTypes.UPDATE_QUESTION_SUCCESS:
         return {
            ...state,
            updatingQuestion: "success",
         };
      case questionTypes.UPDATE_QUESTION_FAILURE:
         return {
            ...state,
            updatingQuestion: "fail",
         };
      case questionTypes.DELETE_QUESTION_REQUEST:
         return {
            ...state,
            deletingQuestion: true,
         };
      case questionTypes.DELETE_QUESTION_SUCCESS:
         return {
            ...state,
            deletingQuestion: false,
         };
      case questionTypes.DELETE_QUESTION_FAILURE:
         return {
            ...state,
            deletingQuestion: false,
         };
      case questionTypes.GET_ANSWER_SUCCESS:
         return {
            ...state,
            answer: { ...state.answer, ...action.data.details[0] },
         };
      case questionTypes.QUESTION_STATE_CHANGER:
         return {
            ...state,
            creatingQuestion: false,
            creatingAnswer: false,
            updatingQuestion: false,
         };
      case questionTypes.RESET_ANSWER_STATE:
         return { ...state, answer: {} };
      default:
         return state;
   }
};
