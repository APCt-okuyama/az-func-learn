# Azure Functions Core Tools

https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-core-tools-reference?tabs=v2

各種 funcコマンド を利用することでFunctionsの操作・管理を行います。
`func durable`コマンドではDurable Functionsのインスタンスの管理が可能です。

## func
`func init`、`func start`、`func new` など

## func azure
`func azure functionapp publish` などAzureへのデプロイなどに利用

## func durable
durable functionsの操作・管理

インスタンス開始 (--function-name に オーケストレーター関数の名前を指定する)
```
func durable start-new --function-name SmsPhoneVerification --input "+8109012345678" --task-hub-name E4TaskHub
```

状態確認
```
func durable get-runtime-status --id 6f04bff3610d42dab4f413a207e5aeeb --task-hub-name E4TaskHub --show-input true --show-output true 
```

すべてのインスタンス
```
func durable get-instances --task-hub-name E4TaskHub
```
インスタンスを終了
```
func durable terminate --id 42eec4b571f943d6a7341e58dce68153 --reason "Found a bug" --task-hub-name E4TaskHub
```

taskhubすべて削除
```
func durable delete-task-hub --task-hub-name E4TaskHub
```




