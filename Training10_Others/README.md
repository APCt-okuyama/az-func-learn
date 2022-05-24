# その他

## Visual Studio Code でのローカルデバッグについて

https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-develop-vs-code?tabs=csharp

`Visual Studio Code`でソースコードにブレークポイントを設定して、F5を押してアプリを実行する。

### 関連する設定

./vscode/task.json ※Pathを環境に合わせる
```
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "func",
			"command": "host start",
			"problemMatcher": "$func-node-watch",
			"isBackground": true,
			"dependsOn": "npm install (functions)",
			"options": {
				"cwd": "${workspaceFolder}/Training1_Sample_App"
			}
		},
:
```

## Functionsのバージョンについて

ランタイム？
拡張ライブラリ？
