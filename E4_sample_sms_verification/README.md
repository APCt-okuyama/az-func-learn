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
