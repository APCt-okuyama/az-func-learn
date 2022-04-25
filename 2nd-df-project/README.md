# 2nd durable functions

Funcコマンドを使って関数を作成する

```
>func -v 
4.0.3971
```

project作成
```
>func init <project name>
```

durable-functionsをインストール
```
>cd <df-project>
>npm install durable-functions
```

Durable Functions の template を確認
```
>func templates list
:
JavaScript Templates:
  Durable Functions activity
  Durable Functions entity
  Durable Functions Entity HTTP starter
  Durable Functions HTTP starter
  Durable Functions orchestrator
:
```

関数を追加 (--template 指定)
```
>func new -t "Durable Functions activity" -n "DF_Activity"
```
```
>func new -t "Durable Functions orchestrator" -n "DF_Orchestrator"
```
```
>func new -t "Durable Functions HTTP starter" -n "DF_HttpStart"
```

実行
```
>func start
```
