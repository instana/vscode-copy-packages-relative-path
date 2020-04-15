import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copy-packages-relative-path.copy', () => {
		const filePath = vscode.window?.activeTextEditor?.document?.fileName;
		if (!filePath) {
			vscode.window.showWarningMessage('Could not determine active file.');
			return;
		}

		if (filePath.indexOf('/packages/') === -1) {
			vscode.window.showWarningMessage(`Active file '${filePath}' does not seem to be located within a packages/ ` +
				`directory. Cannot determine packages/ relative path.`);
			return;
		}
		
		const parts = filePath.split('packages/', 2);
		let relativePath = parts[1];
		if (relativePath.endsWith('.js')) {
			relativePath = relativePath.substring(0, relativePath.length - 3);
		}
		vscode.env?.clipboard?.writeText(relativePath);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
