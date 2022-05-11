# Azure Storage Table Query

REST APIを利用してAzure Storage Tableからデータを取得することができる。

既定ではアクセスが許可されていないため、SAS(Shared Access Signature)を利用しています。

## REST APIの例:RuntimeStatus が completed でないものの一覧を取得
```
curl "https://durablefunc0001taskhub.table.core.windows.net/Training1TaskHubInstances()?$filter=RuntimeStatus%20ne%20'Completed'&sv=2020-08-04&ss=bfqt&srt=o&sp=rwdlacupix&se=2022-05-11T14:15:30Z&st=2022-05-11T06:15:30Z&spr=https&sig=BQ43VNZHNzVRHMZVevJJpPZo2XSyvCGG8ceyipnw75Q%3D"
```


## Storage Explorer を利用する
https://azure.microsoft.com/ja-jp/features/storage-explorer/

Azure Storageの Viewer ツール 開発時はこちらを利用する


集計とかしたい場合は他のDBに移した方が良い。

