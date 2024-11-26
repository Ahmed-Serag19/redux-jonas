const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  activeLoan: false,
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
