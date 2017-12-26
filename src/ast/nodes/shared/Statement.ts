import { NodeBase, Node } from './Node';
import MagicString from 'magic-string';

export interface StatementNode extends Node {}

export class GenericStatementNode extends NodeBase implements StatementNode {
	render (code: MagicString) {
		if (!this.module.graph.treeshake || this.included) {
			super.render(code);
		} else {
			code.remove(
				this.leadingCommentStart || this.start,
				this.next || this.end
			);
		}
	}
}
