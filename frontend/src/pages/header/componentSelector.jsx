import React from "react";

import AdminInfo from "../../components/Admin/admin-info/admin-info.component";
import UsersTab from "../../components/Admin/users-tab/users-tab.component";
import UserTypes from "../../components/Admin/user-types/user-types.component";
import Settings from "../../components/Admin/settings/settings.component";
import MyQuestions from "../../components/Author/my-questions/my-questions.component";
import AllQuestions from "../../components/Author/all-questions/all-questions.component";
import AllQuestionsReviews from "../../components/Reviewer/all-questions-review/all-questions-reviews.compnent";
import MyReviews from "../../components/Reviewer/my-reviews/my-reviews.component";
import Question from "../../components/Author/question/question.component";

const SelectedTabComponent = ({ componentKey, questionType }) => {
   switch (componentKey) {
      case "dashboard":
         return <AdminInfo />;

      case "users":
         return <UsersTab />;

      case "user-types":
         return <UserTypes />;
      case "settings":
         return <Settings />;
      default:
         return <p>Nothing here</p>;
   }
};
export default SelectedTabComponent;
