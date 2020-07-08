# McTools


## setup

### プロジェクト新規作成
```
$ npm run setup:create
```

### 既存プロジェクト
```
$ npm run setup:create
```

#### コマンド内容
- docker起動
- .clasprc.json作成
- claspログイン
- プロジェクト作成 (プロジェクト新規作成のみ)
- プロジェクト選択・クローン (既存プロジェクトのみ)

___

## コマンド

### docker起動
```
$ npm run docker:up
```

### docker終了
```
$ npm run docker:down
```

### 監視・ビルド
```
$ npm run source:watch
```

### スクリプトプッシュ
```
$ npm run source:push
```

___

## ディレクトリ構成
```
.
├── Dockerfile
├── README.md
├── appsscript.json
├── dist
│   ├── appsscript.json
│   └── main.gs
├── docker-compose.yml
├── package-lock.json
├── package.json
├── src
│   ├── config
│   │   ├── alias.ts
│   │   └── db.ts
│   ├── db
│   │   ├── grow.ts
│   │   ├── seeds
│   │   │   ├── authorities.ts
│   │   │   ├── countries.ts
│   │   │   └── users.ts
│   │   └── tables
│   │       ├── authorities.ts
│   │       ├── countries.ts
│   │       ├── user_repogitries.ts
│   │       └── users.ts
│   ├── examples
│   │   ├── create_authorities_table.ts
│   │   ├── create_countries_table.ts
│   │   ├── create_tables.ts
│   │   ├── create_users_table.ts
│   │   ├── cross_join.ts
│   │   ├── inner_join.ts
│   │   ├── outer_join.ts
│   │   ├── query.ts
│   │   ├── record.ts
│   │   ├── record_iterator.ts
│   │   ├── record_namespace.ts
│   │   ├── record_validation.ts
│   │   ├── simpletrigger_onget.ts
│   │   ├── sub_query.ts
│   │   ├── transaction.ts
│   │   └── update_record.ts
│   ├── globals
│   │   ├── main\ copy.ts
│   │   └── main.ts
│   ├── main.ts
│   └── modules
│       ├── mc_record
│       │   ├── index.ts
│       │   └── validators.ts
│       ├── mc_sheet
│       │   ├── data.ts
│       │   ├── index.ts
│       │   ├── interface.ts
│       │   └── views.ts
│       ├── mc_ss
│       │   └── index.ts
│       ├── mc_table
│       │   ├── data_table.ts
│       │   ├── index.ts
│       │   ├── interface.ts
│       │   └── mixins
│       │       ├── dcl.ts
│       │       ├── ddl.ts
│       │       ├── dml.ts
│       │       └── iterater.ts
│       └── utils
│           ├── array.ts
│           ├── is.ts
│           ├── mixin.ts
│           └── object.ts
├── tsconfig.json
├── usega.md
├── webpack.config.js
└── yarn.lock

```