import Statement from './shared/Statement';
import BlockScope from '../scopes/BlockScope';
import ExecutionPathOptions from '../ExecutionPathOptions';
import VariableDeclaration from './VariableDeclaration';
import Pattern from './Pattern';
import Expression from './Expression';
import Scope from '../scopes/Scope';
import BlockStatement from './BlockStatement';

export default class ForOfStatement extends Statement {
	type: 'ForOfStatement';
	left: VariableDeclaration | Pattern;
	right: Expression;
	body: Statement;

	bindNode () {
		this.left.reassignPath([], ExecutionPathOptions.create());
	}

	hasEffects (options: ExecutionPathOptions): boolean {
		return (
			(this.left &&
				(this.left.hasEffects(options) ||
					this.left.hasEffectsWhenAssignedAtPath([], options))) ||
			(this.right && this.right.hasEffects(options)) ||
			this.body.hasEffects(options.setIgnoreBreakStatements())
		);
	}

	includeInBundle () {
		let addedNewNodes = super.includeInBundle();
		if (this.left.includeWithAllDeclarations()) {
			addedNewNodes = true;
		}
		return addedNewNodes;
	}

	initialiseChildren () {
		this.left.initialise(this.scope);
		this.right.initialise(<Scope>this.scope.parent);
		(<BlockStatement>this.body).initialiseAndReplaceScope
			? (<BlockStatement>this.body).initialiseAndReplaceScope(this.scope)
			: this.body.initialise(this.scope);
	}

	initialiseScope (parentScope: Scope) {
		this.scope = new BlockScope({ parent: parentScope });
	}
}
