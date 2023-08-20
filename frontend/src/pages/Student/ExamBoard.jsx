import { Link } from "react-router-dom";
import StudentSidebar from "../../components/Student/StudentSidebar";
import { ExamBoardComponent } from "./StyleComponent/ExamBoard.styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpeationButton } from "../../components/Styles/style-button-component/Button";
import { getPaper } from "../../store/examReducer";

const Data = () => {
  const dispatch = useDispatch();

  const { stdPaper } = useSelector((state) => state.exam);
  const {data} = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(getPaper(data.course));
  }, [data]);

  const paperSubmitHandler = () => {
    localStorage.removeItem("ExamAuth");
  };

  return (
    <ExamBoardComponent>
      <h1>Exam Board</h1>

      <form
        className="examBoard"
        method="POST"
        action="http://localhost:8080/api/v1/user/submitpaper"
        onSubmit={paperSubmitHandler}
      >
        {stdPaper.map((item) => {
          return (
            <ul className="questionLayer">
              <li className="question">
                <strong>Question:</strong> {item.question}
                <ul className="answerLayer">
                  {item.answers.map((ans, index) => {
                    return (
                      <li className="answer">
                        <label>
                          <input
                            type="radio"
                            checked
                            name={`checkid[${ans.question_id}]`}
                            value={ans._id}
                          />
                          <span>{ans.answer}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          );
        })}

        <OpeationButton
          className="primary"
          type="submit"
        >
          Paper Submit
        </OpeationButton>
      </form>
    </ExamBoardComponent>
  );
};

const ExamBoard = () => {
  return <StudentSidebar component={Data()} />;
};

export default ExamBoard;
