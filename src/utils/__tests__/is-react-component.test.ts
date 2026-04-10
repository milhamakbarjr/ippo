import { describe, it, expect } from 'vitest';
import {
  isFunctionComponent,
  isClassComponent,
  isForwardRefComponent,
  isReactComponent,
} from '@/utils/is-react-component';
import { forwardRef } from 'react';

function FunctionComp() { return null; }

class ClassComp {
  static isReactComponent = true;
  render() { return null; }
}

const ForwardRefComp = forwardRef(function(_props, _ref) { return null; });

describe('isFunctionComponent', () => {
  it('returns true for a function', () => {
    expect(isFunctionComponent(FunctionComp)).toBe(true);
  });

  it('returns false for null', () => {
    expect(isFunctionComponent(null)).toBe(false);
  });

  it('returns false for a plain object', () => {
    expect(isFunctionComponent({})).toBe(false);
  });

  it('returns false for a string', () => {
    expect(isFunctionComponent('div')).toBe(false);
  });
});

describe('isClassComponent', () => {
  it('returns true for a class component with isReactComponent', () => {
    expect(isClassComponent(ClassComp)).toBe(true);
  });

  it('returns false for a plain function', () => {
    expect(isClassComponent(FunctionComp)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isClassComponent(null)).toBe(false);
  });
});

describe('isForwardRefComponent', () => {
  it('returns true for a forwardRef component', () => {
    expect(isForwardRefComponent(ForwardRefComp)).toBe(true);
  });

  it('returns false for a plain function', () => {
    expect(isForwardRefComponent(FunctionComp)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isForwardRefComponent(null)).toBe(false);
  });

  it('returns false for an object with non-matching $$typeof', () => {
    // Plain {} has undefined $$typeof which would throw in the source; test with a wrong symbol instead
    expect(isForwardRefComponent({ $$typeof: Symbol('react.memo') })).toBe(false);
  });
});

describe('isReactComponent', () => {
  it('returns true for function component', () => {
    expect(isReactComponent(FunctionComp)).toBe(true);
  });

  it('returns true for class component', () => {
    expect(isReactComponent(ClassComp)).toBe(true);
  });

  it('returns true for forwardRef component', () => {
    expect(isReactComponent(ForwardRefComp)).toBe(true);
  });

  it('returns false for null', () => {
    expect(isReactComponent(null)).toBe(false);
  });

  it('returns false for a string', () => {
    expect(isReactComponent('div')).toBe(false);
  });

  it('returns false for a number', () => {
    expect(isReactComponent(42)).toBe(false);
  });
});
