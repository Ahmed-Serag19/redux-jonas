export const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  activeLoan: false,
};

export default function accountReducer(state = initialState, action) {
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

export function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
