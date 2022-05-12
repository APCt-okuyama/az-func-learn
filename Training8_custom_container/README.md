# カスタム コンテナーの利用

https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-create-function-linux-custom-image?tabs=in-process%2Cbash%2Cazure-cli&pivots=programming-language-javascript

コンテナーの実行にはPremiumプラン/App Serviceプランのホスティングが必要 

Linux(WSL)で作業
```
$ cat /etc/os-release
NAME="Ubuntu"
VERSION="20.04.3 LTS (Focal Fossa)"
```

MSが提供している DockerImage を利用する ※今回はnode
```
docker pull mcr.microsoft.com/azure-functions/node
```

## ローカル環境を構成する

プロジェクト(--dokcer)、関数の作成、動作確認
```
func init --worker-runtime node --language javascript --docker
func new --name HttpExample --template "HTTP trigger"
func start
curl http://localhost:7071/api/HttpExample
```

## Dokcerコンテナー 準備
※DockerHubを利用。(DockerHubのアカウントが必要）

Docker Image の作成  
```
docker build --tag tokym/azurefunctionsimage:v1.0.0 .
```

ローカルで動作確認
```
docker run -p 8080:80 -it tokym/azurefunctionsimage:v1.0.0
```

DockerHubへプッシュ
```
docker push tokym/azurefunctionsimage:v1.0.0
```

## Azure環境の準備
リソースグループ、ストレージ、Functionsプラン(EP1)、関数アプリ
```
az group create --name az-func-example-rg --location japaneast
az storage account create --name durablefunc0001 --resource-group az-func-example-rg --location japaneast --sku Standard_LRS --kind StorageV2
az functionapp plan create --resource-group az-func-example-rg --name myPremiumPlan --location japaneast --number-of-workers 1 --sku EP1 --is-linux
az functionapp create --name durable-sample-func --storage-account durablefunc0001 --resource-group az-func-example-rg --plan myPremiumPlan --deployment-container-image-name tokym/azurefunctionsimage:v1.0.0
```

Azure Strageへの接続文字列を取得して設定しておく
```
az storage account show-connection-string --resource-group az-func-example-rg --name durablefunc0001 --query connectionString --output tsv
"xxxx output xxxx"


az functionapp config appsettings set --name durable-sample-func --resource-group az-func-example-rg --settings AzureWebJobsStorage="xxxx output xxxx"
```

## (補足)
以下のコマンドで取得したURLをDockerHubのWebhookすることで継続的デプロイを有効にできます。
```
az functionapp deployment container config --enable-cd --query CI_CD_URL --output tsv --name durable-sample-func --resource-group az-func-example-rg
```
