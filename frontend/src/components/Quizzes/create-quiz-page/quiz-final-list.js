import React, { useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as Cross } from "../../../assets/img/cross.svg";

const initialQuestions = [
  {
    serialNo: "1",
    index: 1,
    grade: 1,
    standard: "3.0293.44",
    millsDiff: 1,
    dok: 1,
    question: "What is your name ?",
  },
  {
    serialNo: "2",
    index: 2,
    grade: 2,
    standard: "4.83.20",
    millsDiff: 3,
    dok: 2,
    question: "What is your name ?",
  },
  {
    serialNo: "3",
    index: 3,
    grade: 1,
    standard: "823.3452dd.3d",
    millsDiff: 2,
    dok: 4,
    question: "What is your name ?",
  },
  {
    serialNo: "4",
    index: 4,
    grade: 2,
    standard: "s5h3.3j",
    millsDiff: 2,
    dok: 3,
    question: "What is your name ?",
  },
];

const QuizFinalList = () => {
  const [questions, setQuestions] = useState(initialQuestions);

  const dragEndCall = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const tempQuestionState = Object.assign([], questions);

    const sourceQuestion = questions[source.index];
    tempQuestionState.splice(source.index, 1);
    tempQuestionState.splice(destination.index, 0, sourceQuestion);
    console.log("temp", tempQuestionState);
    setQuestions(tempQuestionState);
  };

  return (
    <Row>
      <Col className="mt-3">
        <div>
          <DragDropContext onDragEnd={dragEndCall}>
            <Table
              bordered
              className="border-top-0 border-left-0 border-right-0"
            >
              <thead>
                <tr>
                  <th scope="col" className="border-0 font-style thead"></th>
                  <th scope="col" className="border-0 font-style thead">
                    <FormattedMessage
                      defaultMessage="Grade"
                      id="QuizFinalQuestionGrade"
                    />
                  </th>

                  <th scope="col" className="border-0 font-style thead">
                    <FormattedMessage
                      defaultMessage="Standard"
                      id="QuizFinalQuestionStandard"
                    />
                  </th>
                  <th scope="col" className="border-0 font-style thead">
                    <FormattedMessage
                      defaultMessage="Mills Diff"
                      id="QuizFinalQuestionMillsDiff"
                    />
                  </th>
                  <th scope="col" className="border-0 font-style thead">
                    <FormattedMessage
                      defaultMessage="DOK"
                      id="QuizFinalQuestionDOK"
                    />
                  </th>
                  <th scope="col" className="border-0 font-style thead">
                    <FormattedMessage
                      defaultMessage="Question"
                      id="QuizFinalQuestionQuestion"
                    />
                  </th>
                  <th scope="col" className="border-0 font-style thead"></th>
                </tr>
              </thead>

              <Droppable droppableId={"1"}>
                {(provided) => {
                  return (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                      {questions &&
                        questions.map((question, index) => {
                          return (
                            <Draggable
                              draggableId={question.serialNo.toString()}
                              index={index}
                              key={question.index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <tr
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className={
                                      snapshot.isDragging ? "dragged" : ""
                                    }
                                  >
                                    <td className="border-right-0">
                                      {question.serialNo}
                                    </td>
                                    <td className="border-right-0 border-left-0">
                                      {question.grade}
                                    </td>
                                    <td className="border-right-0 border-left-0">
                                      {question.standard}
                                    </td>
                                    <td className="border-right-0 border-left-0">
                                      {question.millsDiff}
                                    </td>
                                    <td className="border-left-0 border-right-0">
                                      {question.dok}
                                    </td>
                                    <td className="border-left-0 border-right-0">
                                      {question.question}
                                    </td>
                                    <td className="border-left-0 ">
                                      <Cross />
                                    </td>
                                  </tr>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                    </tbody>
                  );
                }}
              </Droppable>
            </Table>
          </DragDropContext>
        </div>
      </Col>
    </Row>
  );
};

export default QuizFinalList;
