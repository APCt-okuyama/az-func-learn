# Twilio を使った本人確認

## 関数
| 関数 | - | 機能 |
| --- | --- | --- |
| SmsPhoneVerification | orchestrator | タイムアウトや再試行の管理<br>電話確認処理 |
| SendSmsChallenge | activity | テキストメッセージを送信する処理 |
| HttpStart | HTTP starter | orchestratorを起動するHTTPトリガー |

funcコマンドでプロジェクトとそれぞれの関数を作成する
```
>func init --worker-runtime node --language javascript
>func new -t "Durable Functions orchestrator" -n SmsPhoneVerification
>func new -t "Durable Functions activity" -n SendSmsChallenge
>func new -t "Durable Functions HTTP starter" -n HttpStart
```

## 必要なライブラリのインストール
```
>npm install durable-functions luxon uuid@3.2.1 seedrandom@2.4.3
```

##　実行

1. 電話番号を指定してオーケストレーションを開始する
```
>curl -X POST -d "+8109012341234" http://localhost:7071/api/orchestrators/SmsPhoneVerification
```

2. sendEventPostUri へイベント送信
受け取ったSMSに記載されている verification code をつけて イベントを送信する  
※{EventName}は SmsChallengeResponse 
```
>curl -X POST -H "Content-Type: application/json" -d "1165" "http://localhost:7071/runtime/webhooks/durabletask/instances/941581aab5654072939d0bfec47045d4/raiseEvent/SmsChallengeResponse?taskHub=TestHubName&connection=Storage&code=0MgYE34uNIRtd4y6lWJv4BikbesGRPpYHGoQWyWsHzPO9WSSa/6NnQ=="
```

3. statusQueryGetUri　で結果を確認   
"runtimeStatus":"Completed"が確認できる
```
curl "http://localhost:7071/runtime/webhooks/durabletask/instances/e1cc6477cce140f79ceaa50af050c835?taskHub=TestHubName&connection=Storage&code=0MgYE34uNIRtd4y6lWJv4BikbesGRPpYHGoQWyWsHzPO9WSSa/6NnQ=="
```

## Azureへのデプロイの例

FunctionsAppを作成
```
>az functionapp create --resource-group az-func-example-rg --consumption-plan-location japaneast --runtime node --runtime-version 14 --functions-version 4 --name durable-sample-func --storage-account durablefunc0001
```

開発中は不用意にスケーリングされないようにScaleLimitを設定しておきます。
```
>az resource update --resource-type Microsoft.Web/sites -g az-func-example-rg -n durable-sample-func/config/web --set properties.functionAppScaleLimit=1
```


アプリをデプロイ
```
>func azure functionapp publish durable-sample-func
>func azure functionapp publish durable-sample-func --publish-local-settings -y
```
--publish-local-settings : local.settings.jsonの内容をAzureに発行し設定を上書きします。


アプリ設定が必要です(Azure Portalから)
```
    "MyTaskHubName" : "E4TaskHub",
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=xxx....   ",
    "TwilioAccountSid": "XXX...",
    "TwilioAuthToken": "YYY...",
    "TwilioPhoneNumber": "+1123456789"    
```



