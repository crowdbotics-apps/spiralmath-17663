import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import "./mathquill-input.styles.css";

const MathquillInput = ({ name, handleAnswerChange, handleQuestionChange }) => {
   return (
      <React.Fragment>
         <SunEditor
            setOptions={editorSettings}
            name={name}
            onChange={
               handleAnswerChange ? handleAnswerChange : handleQuestionChange
            }
         />
      </React.Fragment>
   );
};

const editorSettings = {
   katex: katex,
   buttonList: [
      [
         "undo",
         "redo",
         "font",
         "fontSize",
         "formatBlock",
         "paragraphStyle",
         "blockquote",
         "bold",
         "underline",
         "italic",
         "strike",
         "subscript",
         "superscript",
         "fontColor",
         "hiliteColor",
         "textStyle",
         "removeFormat",
         "outdent",
         "indent",
         "align",
         "horizontalRule",
         "list",
         "lineHeight",
         "table",
         "link",
         "image",
         "video",
         "audio",
         "math",
         "fullScreen",
         "showBlocks",
         "codeView",
         "preview",
         "print",
         "save",
      ],
   ],
};

export default MathquillInput;
