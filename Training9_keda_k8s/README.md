# Kubernetes への関数アプリのデプロイ

https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-kubernetes-keda

KEDA (Kubernetes ベースのイベント ドリブン自動スケーリング)　を利用。

## Kubernatesの準備　(AzureのAKSリソースの準備 )

リソースグループ、AKS
```
az group create --name az-func-example-rg --location japaneast
az aks create --resource-group az-func-example-rg --name myAKSCluster --node-count 1 --enable-addons monitoring --generate-ssh-keys
az aks get-credentials --resource-group az-func-example-rg --name myAKSCluster
kubectl get nodes
```

## KEDAのインストール
kubectl 構成ファイル内で定義されているクラスターに KEDA をインストールします。  
```
kubectl create namespace keda
func kubernetes install
```
※`func` はAzure Functions Core Tools

## Functionsをk8sへデプロイする (dockerhubつかってます)
```
docker login
func kubernetes deploy --name my-func-deployment --registry tokym
```

Durable Functionsが動かない。。。
```
fail: Function.HttpStart[3]
      Executed 'Functions.HttpStart' (Failed, Id=27c68944-1957-4313-a603-94726de97977, Duration=3ms)
Microsoft.Azure.WebJobs.Host.FunctionInvocationException: Exception while executing function: Functions.HttpStart
 ---> System.InvalidOperationException: Webhooks are not configured
```

## KEDA でサポートされているトリガー
```
Azure Storage キュー
Azure Service Bus キュー
Azure Event/IoT Hubs
Apache Kafka
RabbitMQ キュー
```
※サポートされていないトリガーが多数あるため、利用する場合は要注意。