import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// const baseURL = "http://localhost:8080/api/v1";

export const feesSlice = createSlice({
  name: "fees",
  initialState: {
    fees: [],
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
    resetError: (state) => {
      state.error = "";
    },
    setFeesList: (state, action) => {
      state.fees = action.payload;
    },
    addFeesList: (state, action) => {
      state.fees.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setMessage,
  resetMessage,
  setFeesList,
  addFeesList,
  setError,
  resetError,
  setLoading,
} = feesSlice.actions;
export default feesSlice.reducer;

// GET FEES STUDENTS
export const getFeesStudent = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(
      `http://localhost:8080/api/v1/admin/user/feepaid/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await res.json();
    dispatch(setLoading(false));
    if (result.success === true) {
      dispatch(setFeesList(result.data));
    } else {
      dispatch(setMessage("false"));
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};

// Admin Studnets Fees Paid
export const FeesPaidStudent = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await fetch(`http://localhost:8080/api/v1/admin/user/feepaid`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    dispatch(setLoading(false));
    if (result.success === true) {
      dispatch(addFeesList(result.data));
      dispatch(setMessage("Fees Paid Successfully"));
    } else {
      dispatch(setError("Fees Paid Not Successfully"));
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};
