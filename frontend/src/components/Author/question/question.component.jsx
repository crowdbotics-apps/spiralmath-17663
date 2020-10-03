import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl, FormattedDate } from "react-intl";
import { SingleSelect } from "react-select-material-ui";
import { Col, Form, Button } from "react-bootstrap";

import { setQuestionType } from "../../../redux/local/local.actions";
import questionActions from "../../../redux//question/question.action";
import { selectStandardCode } from "../../../redux/question/question.select";
import MathquillInput from "../mathquill-input/mathquill-input.component";
import ReviewInput from "../../Reviewer/review-input/review-input.component";
import MessageBar from "../../ui/message-bar/message-bar.component";
import { validateCreateQuestion } from "./../../../helpers/validation/validationQuestion";
import { ReactComponent as A } from "../../../assets/img/A.svg";
import { ReactComponent as B } from "../../../assets/img/B.svg";
import { ReactComponent as C } from "../../../assets/img/C.svg";
import { ReactComponent as Tick } from "../../../assets/img/tick.svg";
import "./question.styles.css";
import { selectAnswerStatus } from "./../../../redux/question/question.select";
import { selectQuestionFormState } from "./../../../redux/questioFormState/questionFormState.select";
import { selectAnswerContent } from "./../../../redux/question/question.select";
import { selectUpdatingQuestion } from "./../../../redux/question/question.select";

import AuthorDetails from "../../Reviewer/author-details/author-details.component";

const localUser =
   localStorage.getItem("user") && localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;

const millsDiffLevel = [
   { value: 1, label: "Mills Difficulty : 1" },
   { value: 2, label: "Mills Difficulty : 2" },
   { value: 3, label: "Mills Difficulty : 3" },
   { value: 4, label: "Mills Difficulty : 4" },
   { value: 5, label: "Mills Difficulty : 5" },
];
const DOK = [
   { value: 1, label: "Level : 1" },
   { value: 2, label: "Level : 2" },
   { value: 3, label: "Level : 3" },
   { value: 4, label: "Level : 4" },
];
const questionStyles = [
   { value: "Numeric", label: "Numeric" },
   { value: "Word", label: "Word" },
];

const Question = ({ questionType }) => {
   const dispatch = useDispatch();
   const imageRef = useRef(null);
   const formErrorRef = useRef(null);
   const apiErrorRef = useRef(null);
   const standardCode = useSelector(selectStandardCode);
   const creatingAnswer = useSelector(selectAnswerStatus);
   const initialFormState = useSelector(selectQuestionFormState);
   const initialAnswer = useSelector(selectAnswerContent);
   const updatingQuestion = useSelector(selectUpdatingQuestion);

   const [formState, setFormState] = useState({
      ...initialFormState,
      question_type: questionType,
   });

   const [answer, setAnswer] = useState(initialAnswer);

   const [imageButtonText, setImageButtonText] = useState("Add Image");
   const [image, setImage] = useState("");
   const [submitted, setSubmitted] = useState(false);
   const [mcOptions, setMcOptions] = useState({
      A: false,
      B: false,
      C: false,
      name: "",
   });
   const [errors, setErrors] = useState({});

   useEffect(() => {
       if(questionType === "mc"){
         setAnswer({
            A:{
               answer:false,
               reason:""
            },
            B:{
               answer:false,
               reason:""
            },
            C:{
               answer:false,
               reason:""
            }
         })
      }
      // dispatch(questionActions.getStandardCode());
   }, []);

   useEffect(() => {
      if (Object.keys(errors).length === 0 && submitted) {
         submit();
      } else if (Object.keys(errors).length >= 1 && !errors.question) {
         formErrorRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [errors]);

   useEffect(() => {
      if (apiErrorRef) {
         if (apiErrorRef.current) {
            apiErrorRef.current.scrollIntoView({ behavior: "smooth" });
         }
      }
   }, [creatingAnswer]);

   useEffect(() => {
     
      if (mcOptions["name"]) {
         setAnswer((answer) => {
            console.log(answer)
            return {
               ...answer,
               [mcOptions.name]: {
                  ...answer[mcOptions.name],
                  answer: mcOptions[mcOptions.name],
               },
            };
         });
      }
   }, [mcOptions]);

   const handleSelectChange = (name) => (e) => {

      if (name === "standard_set") {
            standardCode &&
            setFormState((prevFormState) => ({
               ...prevFormState,
               standard_code:
                  standardCode && standardCode["Standard Code"][e.i],
               grade_level:
                  standardCode && standardCode["Grade"][e.i],
               [name]: e.set,
            }));
      } else {
         setFormState((prevFormState) => ({ ...prevFormState, [name]: e }));
      }

      setErrors({ ...errors, [name]: "" });
   };
   const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === "summative_status" || name === "state_model") {
         const { checked } = e.target;
         setFormState((prevFormState) => ({
            ...prevFormState,
            [name]: checked,
         }));
      } else {
         setFormState((prevFormState) => ({ ...prevFormState, [name]: value }));
      }
      setErrors({ ...errors, [name]: "" });
   };

   const handleQuestionChange = (e) => {
      setFormState((prev) => ({ ...prev, value: e.trim() }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setErrors(validateCreateQuestion(formState));
      setSubmitted(true);
   };

   const handleCancel = () => {
      dispatch(setQuestionType(false));
   };

   const handleImage = (e) => {
      let image = e.target.files[0];

      setImageButtonText("Image added");
      setImage(image);
   };

   const handleImageClick = (e) => {
      if (!image) {
         imageRef.current.click();
      } else {
      }
   };

   const handleAnswerChange = (name) => (e) => {
      let value;
      let checked;
      if (e.target) {
         checked = e.target.checked;
         value = e.target.value;
      }
      if (questionType === "sa" || questionType === "la") {
         setAnswer({ value: e.trim() });
      } else if (questionType === "t/f") {
         if (name === "true") {
            setAnswer({
               true: !!checked,
               false: !checked,
            });
         } else {
            setAnswer({
               true: !checked,
               false: !!checked,
            });
         }
      } else {
         setAnswer((prevAnswer) => ({
            ...prevAnswer,
            [name]: {
               answer: mcOptions[name],
               reason: value,
            },
         }));
      }
   };

   const handleMcOption = (named) => (e) => {
      setMcOptions((prevMcOption) => {
         return {
            ...prevMcOption,
            [named]: !prevMcOption[named],
            name: named,
         };
      });
   };

   const submit = () => {
      let formData = new FormData();
      const formDataArray = Object.entries(formState);
      for (const [key, value] of formDataArray) {
         if (!(key === "edit") && !(key === "id")) formData.append(key, value);
      }
      if (image) {
         formData.append("image", image);
      }

      if (formState.edit) {
         dispatch(questionActions.updateQuestion(formState.id, formData));
         dispatch(questionActions.updateAnswer(formState.id, formData));
         dispatch(questionActions.resetAnswerState());
      } else {

         dispatch(questionActions.createQuestion(formData));
         dispatch(questionActions.createAnswer(answer));
      }
   };

   const handleClearMessage = () => {
      dispatch(questionActions.questionStateChanger());
   };

  

   const {
      value,
      standard_code,
      standard_set,
      dok,
      question_style,
      summative_status,
      state_model,
      grade_level,
      image_source,
      alt_text,
      copyright_status,
      content_source,
      mills_difficulty_level,
      author_memo,
      author_name,
      reviewer_name,
      created,
      reviewer_date,
   } = formState;



   const isReview = localUser.userObj.reviewQuestions;

   return (
      <React.Fragment>
         {creatingAnswer === "success" && (
            <React.Fragment>
               <div ref={apiErrorRef}></div>
               <MessageBar
                  messageType="SUCCESS"
                  message={"Question created successfully"}
                  handleClearMessage={handleClearMessage}
               />
            </React.Fragment>
         )}
         {creatingAnswer === "fail" && (
            <React.Fragment>
               <div ref={apiErrorRef}></div>
               <MessageBar
                  messageType="ERROR"
                  message={"Question creation failed. Try agan"}
                  handleClearMessage={handleClearMessage}
               />
            </React.Fragment>
         )}

         <div
            className={`px-4 py-4 border form-border border-color ${
               creatingAnswer && "mt-4"
            } `}
            ref={formErrorRef}
         >
            {localUser.userObj.reviewQuestions && (
               <AuthorDetails
                  author_name={author_name}
                  reviewer_name={reviewer_name}
                  created={created}
                  reviewer_date={reviewer_date}
               />
            )}
            <Form.Row className="mb-3">
               <Form.Group as={Col} md="3">
                  <SingleSelect
                     value={mills_difficulty_level}
                     placeholder="Mills Difficulty Level"
                     options={millsDiffLevel}
                     onChange={handleSelectChange("mills_difficulty_level")}
                  />
                  {submitted && errors.mills_difficulty_level && (
                     <p className="text-danger form-text-danger">
                        {errors.mills_difficulty_level}
                     </p>
                  )}
               </Form.Group>
               <Form.Group as={Col} md="2">
                  <SingleSelect
                     value={dok}
                     placeholder="DOK"
                     options={DOK}
                     onChange={handleSelectChange("dok")}
                  />
                  {submitted && errors.dok && (
                     <p className="text-danger form-text-danger">
                        {errors.dok}
                     </p>
                  )}
               </Form.Group>
               <Form.Group as={Col} md="2">
                  <SingleSelect
                     value={question_style}
                     placeholder="Question Style"
                     options={questionStyles}
                     onChange={handleSelectChange(question_style)}
                  />
               </Form.Group>

               <Form.Group as={Col} md="2" className="mt-2 ml-5">
                  <Form.Check
                     type="switch"
                     id="ss"
                     label="Summative Status"
                     name="summative_status"
                     onChange={handleChange}
                     checked={summative_status}
                     value={summative_status}
                  />
               </Form.Group>
               <Form.Group as={Col} md="2" className="mt-2 ml-4">
                  <Form.Check
                     type="switch"
                     id="sm"
                     label="State Model"
                     name="state_model"
                     onChange={handleChange}
                     checked={state_model}
                     value={state_model}
                  />
               </Form.Group>
            </Form.Row>
            <Form.Row className="mb-3">
               <Form.Group as={Col} md="4">
                  <SingleSelect
                     // value={standard_set}
                     placeholder="Standard Set"
                     options={
                        standardCode &&
                        standardCode["Standard Set"].map((set, i) => {
                             return {
                                value:{set,i},
                                label:set,
                                index:i
                             }
                        })
                     }
                     onChange={handleSelectChange("standard_set")}
                  />
                  {submitted && errors.standard_set && (
                     <p className="text-danger form-text-danger">
                        {errors.standard_set}
                     </p>
                  )}
               </Form.Group>

               <Form.Group as={Col} md="4">
                  <Form.Control
                     type="text"
                     value={standard_code}
                     name="standard_code"
                     className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
                        standard_code.length && "label-up"
                     }`}
                     onChange={handleChange}
                  />
                  <span className="floating-label">Standard code</span>
               </Form.Group>
               <Form.Group as={Col} md="4">
                  <Form.Control
                     type="text"
                     value={grade_level}
                     name="grade_level"
                     onChange={handleChange}
                     className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
                        grade_level && "label-up"
                     }`}
                  />
                  <span className="floating-label">Grade level</span>
               </Form.Group>
            </Form.Row>
            <Form.Row className="mb-3">
               <Form.Group as={Col} md="4">
                  <Form.Control
                     type="text"
                     name="copyright_status"
                     value={copyright_status}
                     onChange={handleChange}
                     className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
                        copyright_status.length && "label-up"
                     }`}
                  />
                  <span className="floating-label">Copyright status</span>
               </Form.Group>
               <Form.Group as={Col} md="4">
                  <Form.Control
                     type="text"
                     name="content_source"
                     onChange={handleChange}
                     value={content_source}
                     className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
                        content_source.length && "label-up"
                     }`}
                  />
                  <span className="floating-label">Content source</span>
               </Form.Group>
               <Form.Group as={Col} md="4">
                  <Form.Control
                     type="text"
                     name="author_memo"
                     onChange={handleChange}
                     value={author_memo}
                     className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
                        author_memo.length && "label-up"
                     }`}
                  />
                  <span className="floating-label">Memo</span>
               </Form.Group>
            </Form.Row>
            <Form.Row className="mb-3">
               <Form.Group as={Col} md="6">
                  <Form.Control
                     type="text"
                     name="image_source"
                     value={image_source}
                     onChange={handleChange}
                     className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
                        image_source.length && "label-up"
                     }`}
                  />
                  <span className="floating-label">Image source</span>
               </Form.Group>
               <Form.Group as={Col} md="3">
                  <Form.Control
                     type="text"
                     name="alt_text"
                     value={alt_text}
                     onChange={handleChange}
                     className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
                        alt_text.length && "label-up"
                     }`}
                  />
                  <span className="floating-label">Alt text</span>
               </Form.Group>
               <Form.Group as={Col} md="3" className="alignment ">
                  <input
                     style={{ display: "none" }}
                     type="file"
                     name="file"
                     ref={imageRef}
                     onChange={handleImage}
                  />
                  <Button
                     variant="outline-primary"
                     className="upload-excel"
                     onClick={handleImageClick}
                     disabled={image}
                  >
                     {imageButtonText}
                  </Button>
               </Form.Group>
            </Form.Row>
            <Form.Row>
               <Form.Group as={Col} md="8">
                  <Form.Label className="question-label">
                     Enter question
                  </Form.Label>
                  <MathquillInput
                     name="value"
                     handleQuestionChange={handleQuestionChange}
                  />
                  {submitted && errors.value && (
                     <p className="text-danger form-text-danger">
                        {errors.value}
                     </p>
                  )}
               </Form.Group>
            </Form.Row>
            {(questionType === "sa" || questionType === "la") && (
               <Form.Row>
                  <Form.Group as={Col} md="8">
                     <Form.Label className="question-label">
                        Enter Answer
                     </Form.Label>
                     <MathquillInput
                        handleAnswerChange={handleAnswerChange("value")}
                     />
                  </Form.Group>
               </Form.Row>
            )}
            {questionType === "mc" && (
               <React.Fragment>
                  <Form.Row className="d-flex">
                     <Form.Group as={Col} md="0" className="align-self-center">
                        <A />
                     </Form.Group>
                     <Form.Group as={Col} md="8" className="mr-5">
                        <Form.Control
                           type="text"
                           placeholder="Add Option 1"
                           onChange={handleAnswerChange("A")}
                           value={answer && answer["A"] && answer["A"].reason || ""}
                           className=" border-top-0 border-left-0 border-right-0 rounded-0"
                        />
                     </Form.Group>
                     <Form.Group
                        as={Col}
                        md="1"
                        className="d-flex justify-content-between align-items-center"
                     >
                        <span
                           onClick={handleMcOption("A")}
                           className={`${mcOptions.A && "svg-color-green"}`}
                        >
                           <Tick />
                        </span>
                     </Form.Group>
                  </Form.Row>
                  <Form.Row className="d-flex">
                     <Form.Group as={Col} md="0" className="align-self-center">
                        <B />
                     </Form.Group>
                     <Form.Group as={Col} md="8" className="mr-5">
                        <Form.Control
                           type="text"
                           placeholder="Add Option 2"
                           onChange={handleAnswerChange("B")}
                           value={answer && answer["B"] && answer["B"].reason  || ""}
                           className=" border-top-0 border-left-0 border-right-0 rounded-0"
                        />
                     </Form.Group>
                     <Form.Group
                        as={Col}
                        md="1"
                        className="d-flex justify-content-between align-items-center"
                     >
                        <span
                           onClick={handleMcOption("B")}
                           className={`${mcOptions.B && "svg-color-green"}`}
                        >
                           <Tick />
                        </span>
                     </Form.Group>
                  </Form.Row>
                  <Form.Row className="d-flex">
                     <Form.Group as={Col} md="0" className="align-self-center">
                        <C />
                     </Form.Group>
                     <Form.Group as={Col} md="8" className="mr-5">
                        <Form.Control
                           type="text"
                           placeholder="Add Option 3"
                           onChange={handleAnswerChange("C")}
                           value={answer && answer["C"] && answer["C"].reason || ""}
                           className=" border-top-0 border-left-0 border-right-0 rounded-0"
                        />
                     </Form.Group>
                     <Form.Group
                        as={Col}
                        md="1"
                        className="d-flex justify-content-between align-items-center"
                     >
                        <span
                           onClick={handleMcOption("C")}
                           className={`${mcOptions.C && "svg-color-green"}`}
                        >
                           <Tick />
                        </span>
                     </Form.Group>
                  </Form.Row>
               </React.Fragment>
            )}
            {questionType === "t/f" && (
               <React.Fragment>
                  <Form.Row className="d-flex z-negative">
                     <Form.Group as={Col} md="0" className="align-self-center">
                        <A />
                     </Form.Group>
                     <Form.Group as={Col} md="8" className="mr-5 z-negative">
                        <Form.Control
                           type="text"
                           value="True"
                           className=" border-top-0 border-left-0 border-right-0 rounded-0 z-negative"
                        />
                     </Form.Group>
                     <Form.Group
                        as={Col}
                        md="1"
                        className="d-flex justify-content-between align-items-center"
                     >
                        <Form.Check
                           label=""
                           type="switch"
                           id="custom-switch1"
                           onChange={handleAnswerChange("true")}
                           checked={answer.true}
                        />
                     </Form.Group>
                  </Form.Row>
                  <Form.Row className="d-flex">
                     <Form.Group as={Col} md="0" className="align-self-center">
                        <B />
                     </Form.Group>
                     <Form.Group as={Col} md="8" className="mr-5 z-negative">
                        <Form.Control
                           type="text"
                           value="False"
                           className=" border-top-0 border-left-0 border-right-0 rounded-0 "
                        />
                     </Form.Group>
                     <Form.Group
                        as={Col}
                        md="1"
                        className="d-flex justify-content-between align-items-center"
                     >
                        <Form.Check
                           label=""
                           type="switch"
                           id="custom-switch2"
                           onChange={handleAnswerChange("false")}
                           checked={answer.false}
                        />
                     </Form.Group>
                  </Form.Row>
               </React.Fragment>
            )}
         </div>
         {localUser.userObj.reviewQuestions && <ReviewInput />}
         <div className="my-4 d-flex justify-content-end bottom-btn-grp">
            <Button className="mr-4 cancel-btn" onClick={handleCancel}>
               <FormattedMessage
                  defaultMessage="Cancel"
                  id="componentUsersTabCancelButton"
               />
            </Button>
            <Button className="save-btn" onClick={handleSubmit}>
               {(creatingAnswer || updatingQuestion) && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
               )}
               Save & Send
            </Button>
         </div>
      </React.Fragment>
   );
};

export default Question;
