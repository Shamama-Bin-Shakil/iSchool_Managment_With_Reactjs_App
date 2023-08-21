import { createSlice } from "@reduxjs/toolkit";
// const baseURL = "/api/v1";

export const examSlice = createSlice({
  name: "exam",
  initialState: {
    stdPaper: [],
    exam: [],
    answer: [],
    examAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetMessage: (state) => {
      state.message = "";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setExamAuthenticated: (state, action) => {
      state.examAuthenticated = action.payload;
    },
    resetError: (state) => {
      state.error = "";
    },
    setExamList: (state, action) => {
      state.exam = action.payload;
    },
    addExamList: (state, action) => {
      state.exam.push(action.payload);
    },
    setAnswerList: (state, action) => {
      state.answer = action.payload;
    },
    addAnswerList: (state, action) => {
      state.answer.push(action.payload);
    },
    setExamPaper: (state, action) => {
      state.stdPaper = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStatus: (state, action) => {
      const id = action.payload._id;
      state.exam = state.exam.map((item) =>
        item._id === id ? action.payload : item
      );
    },
  },
});

export const {
  setMessage,
  resetMessage,
  setExamList,
  addExamList,
  setAnswerList,
  addAnswerList,
  setError,
  resetError,
  setLoading,
  setStatus,
  setExamAuthenticated,
  setExamPaper,
} = examSlice.actions;
export default examSlice.reducer;

// CREATE QUESTION
export const createQuestion = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(`/api/v1/admin/question`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const result = await res.json();
    dispatch(setLoading(false));
    if (result.success === true) {
      dispatch(addExamList(result.data));
      dispatch(setMessage("Question Add Successfully"));
    } else {
      dispatch(setError("Some Error Occurred"));
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};

// UPDATE QUESTION
export const updateQuestion =
  ({ id, question, course }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await fetch(
        `/api/v1/admin/updatequestion/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({ question, course }),
          headers: { "content-type": "application/json" },
        }
      );
      const result = await res.json();
      // console.log(result);
      dispatch(setLoading(false));
      if (result.success === true) {
        dispatch(setMessage("Question Update Successfully"));
      } else {
        dispatch(setError("Some Error Occurred"));
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

// DELETE QUESTION
export const deleteQuestion = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(
      `/api/v1/admin/deletequestion/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const result = await res.json();
    // console.log(result);
    dispatch(setLoading(false));
    if (result.success === true) {
      dispatch(setMessage(result.message));
    } else {
      dispatch(setError("Some Error Occurred"));
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};

// GET QUESTION
export const getExamQuestion = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(`/api/v1/admin/getquestion`, {
      method: "GET",
      credentials: "include",
    });
    const result = await res.json();
    dispatch(setLoading(false));
    if (result.success === true) {
      dispatch(setExamList(result.data));
    } else {
      dispatch(setMessage("Some Error Occurred"));
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};

// GET SINGLE QUESTION
export const getSingleQuestion = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(
      `/api/v1/admin/getsinglequestion/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    dispatch(setLoading(false));
    // console.log(result);
    if (result.success === true) {
      dispatch(setAnswerList(result.data));
    } else {
      dispatch(setMessage("Some Error Occurred"));
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};

// CREATE ANSWER
export const createAnswer = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(
      `/api/v1/admin/addsingleanswer`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    // console.log(result);
    dispatch(setLoading(false));
    if (result.success === true) {
      dispatch(setAnswerList(result.data.answers));
      dispatch(setMessage("Answer Add Successfully"));
    } else {
      dispatch(setError("Some Error Occurred"));
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};

// UPDATE ANSWER
export const updateAnswer =
  ({ id, ansId, answer, correctAnswer }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await fetch(
        `/api/v1/admin/getsingleanswerupdate/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({ ansId, answer, correctAnswer }),
          headers: { "content-type": "application/json" },
        }
      );
      const result = await res.json();
      // console.log(result);
      dispatch(setLoading(false));
      if (result.success === true) {
        dispatch(setMessage("Answer Update Successfully"));
      } else {
        dispatch(setError("Some Error Occurred"));
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

// GET ANSWER
export const getAnswer = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(
      `/api/v1/admin/getsinglequestionanswer/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    dispatch(setLoading(false));

    // console.log(result);

    if (result.success === true) {
      dispatch(setAnswerList(result.data));
    } else {
      dispatch(setMessage("Some Error Occurred"));
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};

// DELETE QUESTION
export const deleteAnswer = (ansId, questionId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(
      `/api/v1/admin/getsingleanswerdelete?questionId=${questionId}&ansId=${ansId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const result = await res.json();
    // console.log(result);
    dispatch(setLoading(false));

    if (result.success === true) {
      dispatch(setMessage("Delete Answer Successfully"));
      dispatch(setAnswerList(result.data));
      getAnswer(ansId);
    } else {
      dispatch(setError("Some Error Occurred"));
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};

// QUESITON STATUS
export const statusQuestion = (id, status) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(`/api/v1/admin/status/${id}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    dispatch(setLoading(false));

    if (result.success === true) {
      dispatch(setMessage("Status Update Successfully"));
      dispatch(setStatus(result.user));
    } else {
      dispatch(setError("Status Update Not Successfully"));
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
  }
};

// GET LOGIN PASSWORD EXAM
export const getExamPassword = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(
      `/api/v1/user/getexampassword`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    dispatch(setLoading(false));
    // console.log(result);
    if (result.success === true) {
      dispatch(setMessage("Send Password, Contact Admin"));
    } else {
      dispatch(setError("Password not send, try again"));
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
  }
};

// STUDENTS LOGIN EXAM PAPER
export const loginExamPassword = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(
      `/api/v1/user/loginexampassword`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    dispatch(setLoading(false));
    // console.log(result);
    if (result.success === true) {
      dispatch(setMessage(result.message));
      localStorage.setItem("ExamAuth", true);
    } else {
      dispatch(setError(result.message));
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
  }
};

export const getPaper = (course) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(`/api/v1/user/getpaper/${course}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await res.json();
    dispatch(setLoading(false));
    // console.log(result);
    if (result.success === true) {
      dispatch(setExamPaper(result.data));
    } else {
      dispatch(setError(result.message));
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
  }
};
