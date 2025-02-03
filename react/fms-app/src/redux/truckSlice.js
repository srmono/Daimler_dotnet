import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/trucks";

// Helper function for error handling
const handleRequestError = (error) => error.response?.data || "An error occurred";

// Async Thunks actions
export const fetchTrucks = createAsyncThunk("trucks/fetchTrucks", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
});

export const getTruckById = createAsyncThunk("trucks/getTruckById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
});

export const addTruck = createAsyncThunk("trucks/addTruck", async (truck, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(API_URL, truck);
    return data;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
});

export const updateTruck = createAsyncThunk("trucks/updateTruck", async (truck, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_URL}/${truck.id}`, truck);
    return data;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
});

export const deleteTruck = createAsyncThunk("trucks/deleteTruck", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(handleRequestError(error));
  }
});

// Truck Slice
const truckSlice = createSlice({
  name: "trucks",
  initialState: {
    list: [],
    selectedTruck: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrucks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTrucks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchTrucks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getTruckById.fulfilled, (state, action) => {
        state.selectedTruck = action.payload;
      })
      .addCase(getTruckById.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addTruck.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTruck.fulfilled, (state, action) => {
        state.list = state.list.map((t) => (t.id === action.payload.id ? action.payload : t));
      })
      .addCase(deleteTruck.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export default truckSlice.reducer;


//-----

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:5000/trucks";

// // Async actions for fetching data
// export const fetchTrucks = createAsyncThunk(
//   "trucks/fetchTrucks",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to fetch trucks");
//     }
//   }
// );

// export const getTruckById = createAsyncThunk(
//     "trucks/getTruckById",
//     async (id, { rejectWithValue }) => {
//       try {
//         const response = await axios.get(`${API_URL}/${id}`);
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response?.data || "Truck not found");
//       }
//     }
//   );

  
// export const addTruck = createAsyncThunk(
//   "trucks/addTruck",
//   async (truck, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(API_URL, truck);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to add truck");
//     }
//   }
// );

// export const updateTruck = createAsyncThunk(
//   "trucks/updateTruck",
//   async (truck, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${API_URL}/${truck.id}`, truck);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to update truck");
//     }
//   }
// );

// export const deleteTruck = createAsyncThunk(
//   "trucks/deleteTruck",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to delete truck");
//     }
//   }
// );

// // Truck slice
// const truckSlice = createSlice({
//   name: "trucks",
//   initialState: {
//     list: [],
//     selectedTruck: null,
//     status: "idle",// idle | loading | succeeded | failed
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Trucks
//       .addCase(fetchTrucks.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchTrucks.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.list = action.payload;
//       })
//       .addCase(fetchTrucks.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//        // Fetch Single Truck
//       .addCase(getTruckById.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(getTruckById.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.selectedTruck = action.payload;
//       })
//       .addCase(getTruckById.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Add Truck
//       .addCase(addTruck.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })
//       .addCase(addTruck.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       // Update Truck
//       .addCase(updateTruck.fulfilled, (state, action) => {
//         const index = state.list.findIndex((t) => t.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       })
//       .addCase(updateTruck.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       // Delete Truck
//       .addCase(deleteTruck.fulfilled, (state, action) => {
//         state.list = state.list.filter((t) => t.id !== action.payload);
//       })
//       .addCase(deleteTruck.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export default truckSlice.reducer;



// --------------------

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:5000/trucks";

// // Async actions for fetching data
// export const fetchTrucks = createAsyncThunk("trucks/fetchTrucks", async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// });

// export const addTruck = createAsyncThunk("trucks/addTruck", async (truck) => {
//   const response = await axios.post(API_URL, truck);
//   return response.data;
// });

// export const updateTruck = createAsyncThunk("trucks/updateTruck", async (truck) => {
//   const response = await axios.put(`${API_URL}/${truck.id}`, truck);
//   return response.data;
// });

// export const deleteTruck = createAsyncThunk("trucks/deleteTruck", async (id) => {
//   await axios.delete(`${API_URL}/${id}`);
//   return id;
// });

// // Truck slice
// const truckSlice = createSlice({
//   name: "trucks",
//   initialState: {
//     list: [],
//     status: "idle",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTrucks.fulfilled, (state, action) => {
//         state.list = action.payload;
//       })
//       .addCase(addTruck.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })
//       .addCase(updateTruck.fulfilled, (state, action) => {
//         const index = state.list.findIndex((t) => t.id === action.payload.id);
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       })
//       .addCase(deleteTruck.fulfilled, (state, action) => {
//         state.list = state.list.filter((t) => t.id !== action.payload);
//       });
//   },
// });

// export default truckSlice.reducer;
