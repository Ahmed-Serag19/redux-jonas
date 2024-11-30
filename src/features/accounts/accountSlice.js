export const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  activeLoan: false,
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + Number(action.payload) };
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
    case "account/resetAccount":
      return { ...initialState };
    default:
      return state;
  }
}

export function resetAccount() {
  return {
    type: "account/resetAccount",
  };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

export function deposit(amount, currency) {
  if (currency === "USD") {
    return {
      type: "account/deposit",
      payload: amount,
    };
  }
  return async function (dispatch, getState) {
    try {
      // API CALL
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch exchange rates.");
      }
      const data = await res.json();
      const convertedAmount = (amount * data.rates["USD"]).toFixed(2);
      console.log(convertedAmount);

      // return action

      dispatch({
        type: "account/deposit",
        payload: convertedAmount,
      });
    } catch (error) {
      console.error("Error in deposit action:", error);
      // Optionally, dispatch a failure action to update state
    }
  };
}

export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
