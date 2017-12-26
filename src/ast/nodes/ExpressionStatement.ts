import MagicString from 'magic-string';
import { GenericStatementNode } from './shared/Statement';

export default class ExpressionStatement extends GenericStatementNode {
	render (code: MagicString) {
		super.render(code);
		if (this.included) this.insertSemicolon(code);
	}
}
