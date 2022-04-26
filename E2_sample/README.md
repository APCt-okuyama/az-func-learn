# ファンアウト・ファンインのサンプル

指定されたディレクト配下のファイルをBLOBに再帰的にアップロードする


## 構成
以下の４つ
```
・HTTPトリガー(httpStart)
・オーケストレーター(backupSiteContent)
・アクティビティ(CopyFileToBlob)
・アクティビティ(GetFileList)
```

## プロジェクト作成
プロジェクトを作成して、オーケストレーター・アクティビティを作成する
```
>func init
>npm install durable-functions
>func new -t "Durable Functions HTTP starter" -n "MyHttpStart"
>func new -t "Durable Functions orchestrator" -n "MyOrchestrator"
>func new -t "Durable Functions activity" -n "ActivityCopyFile2Blob"
>func new -t "Durable Functions activity" -n "ActivityGetFileList"
```

## 動作確認 
(実行にはlocal.settings.json の AzureWebJobsStorageの設定が必要)
```
>func start
```

```
>curl -X POST -d "C:\work" http://localhost:7071/api/orchestrators/MyOrchestrator
```