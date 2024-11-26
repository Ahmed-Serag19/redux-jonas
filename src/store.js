import { combineReducers, createStore } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  activeLoan: false,
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        activeLoan: true,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      if (state.balance >= state.loan) {
        return {
          ...state,
          loan: 0,
          loanPurpose: "",
          balance: state.balance - state.loan,
          activeLoan: false,
        };
      } else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// store.dispatch({
//   type: "account/deposit",
//   payload: 5000,
// });

// store.dispatch({
//   type: "account/withdraw",
//   payload: 200,
// });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 5000,
//     purpose: "Buy a new car",
//   },
// });
// store.dispatch({
//   type: "account/withdraw",
//   payload: 2000,
// });
// store.dispatch({
//   type: "account/payLoan",
// });
// console.log(store.getState());
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
function payLoan() {
  return {
    type: "account/payLoan",
  };
}
store.dispatch(requestLoan(1000, "Buy a new car"));
store.dispatch(withdraw(100));
store.dispatch(deposit(3000));
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "account/updateName", payload: fullName };
}

store.dispatch(createCustomer("Ahmed Mohamed", "1234567"));
console.log(store.getState());
