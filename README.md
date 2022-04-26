# az-func-learn (durable functions)

## 概要
サーバレス環境でステートフル関数を記述できる拡張機能

https://docs.microsoft.com/ja-jp/azure/azure-functions/durable/quickstart-js-vscode

## durable functions の機能・特徴

機能的には orchestrator関数 と entity関数 の2種類

| 関数 | 機能 |
| --- | ---|
|orchestrator関数|ステートフルなワークフローの定義が簡単に行える|
|entity関数|ステートフルなエンティティの定義が簡単に行える|

### 関数の種類
```
Durable Functions activity
Durable Functions HTTP starter
Durable Functions orchestrator

Durable Functions entity
Durable Functions Entity HTTP starter
```

## アプリケーション パターン

| # |パターン名 | 簡単な説明 |
| :--: | --- | --- |
| #1 | 関数チェーン | ワークフローの実現 |
| #2 | ファンアウト/ファンイン | 並列処理の実現 |
| #3 | 非同期 HTTP API | 実行時間の長い処理の調整 |
| #4 | モニター | 柔軟な監視処理 |
| #5 | 人による操作 | タイマーを利用したワークフロー |
| #6 | アグリゲーター (※entityを利用) | データの集計 |
[公式の説明はこちら](https://docs.microsoft.com/ja-jp/azure/azure-functions/durable/durable-functions-overview)

## 開発に必要なもの
```
Visual Studio Code
Azure Functions VS Code 拡張
Azure ストレージアカウント (Azure サブスクリプション)
Node.js 10.x または 12.x ※v14で試しています。
Azure Functions Core Tools (funcコマンド)
```

## サンプルソースコード
| フォルダ名 | 内容 |
| --- | ---|
| 1st-df-project | vs codeを使って初めの関数を作成 |
| 2nd-df-project | Core Tools(funcコマンド)を使って作成 |
| 3rd-df-project | Entityのサンプル (単純なcounter) |
| E2_sample | ファインイン・ファンアウトのサンプル |




