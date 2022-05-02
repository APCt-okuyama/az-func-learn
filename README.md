# az-func-learn (durable functions)

## 概要
サーバレス環境でステートフル関数を記述できる拡張機能

https://docs.microsoft.com/ja-jp/azure/azure-functions/durable/quickstart-js-vscode

## durable functions の機能・特徴

機能的には orchestrator関数 と entity関数 の2種類

| 関数 | 機能 |
| --- | ---|
|orchestrator関数|ステートフルなワークフローの定義が簡単に行える<br>※コードは決定論的でなければいけない|
|entity関数|ステートフルなエンティティの定義が簡単に行える<br>※状態・情報の保存先として利用できる|

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
| #3 | 非同期 HTTP API | 実行時間の長い処理の調整 <br>※オーケストレーター関数の状態をクエリするWebhook HTTP APIが組み込みサポートされている |
| #4 | モニター | 柔軟な監視処理 |
| #5 | 人による操作 | タイマーを利用したワークフロー |
| #6 | アグリゲーター | データの集計<br>(※entityを利用) |

[詳細な説明はこちらを参照](https://docs.microsoft.com/ja-jp/azure/azure-functions/durable/durable-functions-overview)

## 開発に必要なもの
```
Azure Account
Visual Studio Code
Azure Functions VS Code 拡張
Azure ストレージアカウント (Azure サブスクリプション)
Node.js 10.x または 12.x ※v14で試しています。
Azure Functions Core Tools (funcコマンド)
```
### Azureリソースの準備 
リソースグループとストレージアカウントを作成しておく
```
>az login
>az group create --name az-func-example-rg --location japaneast
>az storage account create --name durablefunc0001 --resource-group az-func-example-rg --location japaneast --sku Standard_RAGRS --kind StorageV2
>az functionapp create --resource-group az-func-example-rg --consumption-plan-location japaneast --runtime node --runtime-version 14 --functions-version 4 --name durable-sample-func --storage-account durablefunc0001
```
作成したストレージアカウントに自動的にdurabel functions 管理用のキュー、テーブルが作成されます。

(注意) 不要になったら削除する
```
>az group delete --name az-func-example-rg
```

## サンプルソースコード
| フォルダ名 | 内容 |
| --- | ---|
| 1st-df-project | vs codeを使って初めの関数を作成 |
| 2nd-df-project | Core Tools(funcコマンド)を使って作成 |
| 3rd-df-project | Entityのサンプル (単純なcounter) |
| E2_sample | ファインイン・ファンアウトのサンプル |
| E3_sample_Monitor | 監視のサンプル <br> twilio を利用 <br> OpenWeather API を利用 |
| E4_sample_sms_verification | 人による操作のサンプル<br> Twilio を利用した本人確認|



