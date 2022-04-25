# 1st durable functions

https://docs.microsoft.com/ja-jp/azure/azure-functions/durable/quickstart-js-vscode
を動かしてみる。

## 動作確認
```
>func start
```

```
>curl http://localhost:7071/api/orchestrators/HelloOrchestrator
```

```
>curl "http://localhost:7071/runtime/webhooks/durabletask/instances/ac74c33bfac04427a10a8f3502922c98?taskHub=TestHubName&connection=Storage&code=JdwL64esmXbganoNMBhjNu1Kx9Gb1lmgBvcI4ImKv4zpJ3nerHhGaA=="
```