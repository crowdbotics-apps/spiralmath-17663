import React from "react";
import { Table, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as Cross } from "../../../assets/img/cross.svg";

const QuizFinalList = ({ questions, dragEndCall }) => {
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
                              key={question.order}
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

                                    <td className="border-left-0 border-right-0">
                                      {question.value}
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
