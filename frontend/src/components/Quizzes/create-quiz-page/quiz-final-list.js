import React from "react";
import { Table, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import parse from "html-react-parser";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as Cross } from "../../../assets/img/cross.svg";
import { ReactComponent as UpAndDown } from "../../../assets/img/up-and-down.svg";

const QuizFinalList = ({ questions, dragEndCall, handleRemoveQuestion }) => {
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
                    Standard
                  </th>

                  <th scope="col" className="border-0 font-style thead">
                    Mills Diff
                  </th>
                  <th scope="col" className="border-0 font-style thead">
                    DOK
                  </th>

                  <th scope="col" className="border-0 font-style thead">
                    <FormattedMessage
                      defaultMessage="Question"
                      id="QuizFinalQuestionQuestion"
                    />
                  </th>
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
                              draggableId={question.id.toString()}
                              index={index}
                              key={question.id}
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
                                      {question.order}
                                    </td>
                                    <td className="border-right-0 border-left-0">
                                      {question.grade_level}
                                    </td>
                                    <td className="border-right-0 border-left-0">
                                      {question.standard_code}
                                    </td>
                                    <td className="border-right-0 border-left-0">
                                      {question.mills_difficulty_level}
                                    </td>
                                    <td className="border-right-0 border-left-0">
                                      {question.dok}
                                    </td>

                                    <td className="border-left-0 border-right-0">
                                      {question.value && parse(question.value)}
                                    </td>
                                    <td
                                      className="border-left-0 border-right-0"
                                      onClick={handleRemoveQuestion(
                                        question.id
                                      )}
                                    >
                                      <Cross />
                                    </td>
                                    <td className="border-left-0 ">
                                      <UpAndDown />
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
