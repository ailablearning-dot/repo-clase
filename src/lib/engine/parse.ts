import {
  CalcError,
  type FunctionName,
  type Operator,
  type Token,
} from '../../types/calculator';

export type Node =
  | { type: 'num'; value: number }
  | { type: 'const'; name: 'PI' | 'E' }
  | { type: 'binary'; op: Operator; left: Node; right: Node }
  | { type: 'unary'; op: '-'; operand: Node }
  | { type: 'fact'; operand: Node }
  | { type: 'call'; name: FunctionName; arg: Node };

class Parser {
  pos = 0;

  constructor(private tokens: Token[]) {}

  peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  eat(): Token {
    const tok = this.tokens[this.pos];
    if (!tok) throw new CalcError('SYNTAX', 'Expresión incompleta');
    this.pos++;
    return tok;
  }

  expect(type: Token['type']): Token {
    const tok = this.eat();
    if (tok.type !== type) {
      throw new CalcError('SYNTAX', `Se esperaba ${type}`);
    }
    return tok;
  }

  parseExpression(): Node {
    return this.parseAdditive();
  }

  parseAdditive(): Node {
    let left = this.parseMultiplicative();
    while (true) {
      const tok = this.peek();
      if (tok?.type === 'OP' && (tok.op === '+' || tok.op === '-')) {
        this.eat();
        const right = this.parseMultiplicative();
        left = { type: 'binary', op: tok.op, left, right };
      } else {
        break;
      }
    }
    return left;
  }

  parseMultiplicative(): Node {
    let left = this.parseUnary();
    while (true) {
      const tok = this.peek();
      if (tok?.type === 'OP' && (tok.op === '*' || tok.op === '/')) {
        this.eat();
        const right = this.parseUnary();
        left = { type: 'binary', op: tok.op, left, right };
      } else {
        break;
      }
    }
    return left;
  }

  parseUnary(): Node {
    const tok = this.peek();
    if (tok?.type === 'OP' && tok.op === '-') {
      this.eat();
      const operand = this.parseUnary();
      return { type: 'unary', op: '-', operand };
    }
    if (tok?.type === 'OP' && tok.op === '+') {
      this.eat();
      return this.parseUnary();
    }
    return this.parsePower();
  }

  parsePower(): Node {
    const base = this.parsePostfix();
    const tok = this.peek();
    if (tok?.type === 'OP' && tok.op === '^') {
      this.eat();
      const exponent = this.parseUnary();
      return { type: 'binary', op: '^', left: base, right: exponent };
    }
    return base;
  }

  parsePostfix(): Node {
    let node = this.parsePrimary();
    while (this.peek()?.type === 'FACT') {
      this.eat();
      node = { type: 'fact', operand: node };
    }
    return node;
  }

  parsePrimary(): Node {
    const tok = this.eat();
    switch (tok.type) {
      case 'NUMBER':
        return { type: 'num', value: tok.value };
      case 'CONST':
        return { type: 'const', name: tok.name };
      case 'LPAREN': {
        const inner = this.parseExpression();
        this.expect('RPAREN');
        return inner;
      }
      case 'FUNC': {
        this.expect('LPAREN');
        const arg = this.parseExpression();
        this.expect('RPAREN');
        return { type: 'call', name: tok.name, arg };
      }
      default:
        throw new CalcError('SYNTAX', 'Expresión incompleta');
    }
  }
}

export function parse(tokens: Token[]): Node {
  if (tokens.length === 0) {
    throw new CalcError('SYNTAX', 'Expresión vacía');
  }
  const parser = new Parser(tokens);
  const node = parser.parseExpression();
  if (parser.pos !== tokens.length) {
    throw new CalcError('SYNTAX', 'Sobran tokens');
  }
  return node;
}
