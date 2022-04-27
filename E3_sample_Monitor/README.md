# モニターのサンプル

監視の実装サンプル

## サンプルで利用する外部のservice 
| service | 内容 |
| --- | --- |
| Twilio | 携帯電話にSMSメッセージを送信 |
| OpenWeather API | 気象条件 |

それぞれ無料のアカウントを作成する必要があります。

## 関数
| 関数 | - | 機能 |
| --- | --- | --- |
| Monitor | orchestrator | GetIsClearを定期的に呼び出す<br>GetIsClear が true の場合に SendGoodWeatherAlert を呼び出す |
| GetIsClear | activity | 気象条件を確認する (外部APIの呼び出し) |
| SendGoodWeatherAlert | activity | Twilio経由でSMSを送信 |
| TestHttpStart | HTTP starter | Monitor(orchestrator関数)を起動するHTTPトリガー |

## (参考)funcコマンドでそれぞれの関数を作成する
```
>func new -t "Durable Functions orchestrator" -n "Monitor"
>func new -t "Durable Functions activity" -n "GetIsClear"
>func new -t "Durable Functions activity" -n "SendGoodWeatherAlert"
>func new -t "Durable Functions HTTP starter" -n "TestHttpStart"
```

例 curl で http start
```
>curl -X POST -d "{\"location\":{\"city\":\"testcity\",\"state\":\"teststate\"},\"phone\":\"123\"}" http://localhost:7071/api/orchestrators/monitor
>curl -X POST -d @sample.json http://localhost:7071/api/orchestrators/monitor"
```