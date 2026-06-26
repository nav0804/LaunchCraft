import * as vscode from 'vscode';
import { StackProfile } from '../../types';
import { Logger } from '../../utils/logger';

export abstract class BaseDetector {
    protected next: BaseDetector | null = null;

    public setNext(detector: BaseDetector): BaseDetector {
        this.next = detector;
        return detector;
    }

    public async detect(root: vscode.Uri): Promise<StackProfile | null> {
        Logger.info(`Running detector: ${this.constructor.name}`);
        const result = await this.tryDetect(root);
        
        if (result) {
            Logger.info(`✅ Match found by ${this.constructor.name}: ${result.language}/${result.framework}`);
            return result;
        }
        
        Logger.info(`❌ No match in ${this.constructor.name}, passing to next.`);
        return this.next ? this.next.detect(root) : null;
    }

    protected abstract tryDetect(root: vscode.Uri): Promise<StackProfile | null>;

    // Upgraded file search with logging and glob patterns
    protected async fileExists(filename: string): Promise<boolean> {
        Logger.info(`Scanning workspace for: ${filename}`);
        
        // Using ** allows it to find the file even if it's one folder deep
        const searchPattern = `**/${filename}`;
        const files = await vscode.workspace.findFiles(searchPattern, '**/node_modules/**', 1);
        
        if (files.length > 0) {
            Logger.info(`-> Found ${filename} at ${files[0].path}`);
            return true;
        }
        
        Logger.info(`-> Did not find ${filename}`);
        return false;
    }
}