import MagicString from 'magic-string';
import { GenericStatementNode } from './shared/Statement';

export default class EmptyStatement extends GenericStatementNode {
	type: 'EmptyStatement';

	render (code: MagicString) {
		if (
			this.parent.type === 'BlockStatement' ||
			this.parent.type === 'Program'
		) {
			code.remove(this.start, this.end);
		}
	}
}
