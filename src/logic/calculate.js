import Big from 'big.js';
import operate from './operate';

const isNumber = (item) => !!item.match(/[0-9]+/);

const calculate = (state, buttonName) => {
  if (buttonName === 'AC') {
    return { total: '0', next: null, operation: null };
  }

  if (isNumber(buttonName)) {
    if (buttonName === '0' && state.next === '0') {
      return {};
    }

    if (state.operation) {
      if (state.next) {
        return { ...state, next: state.next + buttonName };
      }
      return { ...state, next: buttonName };
    }

    if (state.next) {
      return { ...state, next: state.next + buttonName, total: null };
    }
    return { ...state, next: buttonName, total: null };
  }

  if (buttonName === '.') {
    if (state.next) {
      if (state.next.includes('.')) {
        return {};
      }
      return { ...state, next: state.next + '.' };
    }
    if (state.operation) {
      return { ...state, next: '0.' };
    }
    if (state.total) {
      if (state.total.includes('.')) {
        return {};
      }
      return { ...state, next: state.total + '.' };
    }
    return { ...state, next: '0.' };
  }

  if (buttonName === '=') {
    if (state.next && state.operation) {
      return {
        total: operate(state.total, state.next, state.operation),
        next: null,
        operation: null,
      };
    }
    return {};
  }

  if (buttonName === '+/-') {
    if (state.next) {
      return { ...state, next: (-1 * parseFloat(state.next)).toString() };
    }
    if (state.total) {
      return { ...state, total: (-1 * parseFloat(state.total)).toString() };
    }
    return {};
  }

  if (state.operation) {
    return {
      total: operate(state.total, state.next, state.operation),
      next: null,
      operation: buttonName,
    };
  }

  if (!state.next) {
    return { ...state, operation: buttonName };
  }

  return {
    total: state.next,
    next: null,
    operation: buttonName,
  };
};

export default calculate;
