# Typescript で Functions を作成


## プロジェクトと関数を作成して、ローカルで実行できることを確認する

```
func init --typescript
func new --name HttpExample --template "HTTP trigger"
npm install
npm start
```

動作確認
```
curl http://localhost:7071/api/HttpExample
```

## Azureへデプロイして動作確認

※リソースグループ、関数アプリを事前に作成しておく

build
```
npm run build:production
```

deploy
```
func azure functionapp publish durable-sample-func
```

## Durable Functions の動作確認

durable-functionsをインストール
```
npm install durable-functions
```

Client関数、Activity関数、Orchestrator関数をそれぞれ作成
```
func new -t "Durable Functions HTTP starter" -n HttpStart
func new -t "Durable Functions activity" -n Activity01
func new -t "Durable Functions activity" -n Activity02
func new -t "Durable Functions orchestrator" -n Orchestrator01
```

ローカルで実行 (local.setting.json AzureWebJobsStorage を設定)
```
npm start
curl http://localhost:7071/api/orchestrators/Orchestrator01
```